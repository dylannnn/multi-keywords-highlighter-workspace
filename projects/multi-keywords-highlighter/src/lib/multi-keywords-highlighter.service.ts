import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN,
  MultiKeywordsHighlighterConstants,
  MultiKeywordsHighlighterConfig,
  defaultConfig,
  IKeyword,
  COLOR
} from './core';

@Injectable({
  providedIn: 'root'
})
export class MultiKeywordsHighlighterService {

  localKeywordsSubject = new BehaviorSubject<IKeyword[]>([]);
  localKeywords$ = this.localKeywordsSubject.asObservable();

  private highlightedStatusSubject = new BehaviorSubject<boolean>(false);
  highlightedStatus$ = this.highlightedStatusSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN) private multiKeywordsHighlighterConfig: Partial<MultiKeywordsHighlighterConfig>
  ) {}

  get config(): MultiKeywordsHighlighterConfig {
    return Object.assign(defaultConfig, this.multiKeywordsHighlighterConfig);
  }

  get highlightedStatusText$(): Observable<string> {
    return this.highlightedStatus$.pipe(
      map(status => {
        return status ? MultiKeywordsHighlighterConstants.HIGHLIGHTER.ON : MultiKeywordsHighlighterConstants.HIGHLIGHTER.OFF;
      })
    );
  }

  get isHighlight(): boolean {
    return this.highlightedStatusSubject.value;
  }

  toggleHighlight(status: boolean): void {
    return this.highlightedStatusSubject.next(status);
  }

  addKeyword(keyword: IKeyword): void {
    const tempKeywordList = this.localKeywordsSubject.value;
    if (this.isValidKeyword(keyword)) {
      tempKeywordList.push(keyword);
    }
    if (this.isHighlight) {
      this.hightlightKeyword(keyword);
    }
    this.localKeywordsSubject.next(tempKeywordList);
  }

  isValidKeyword(keyword: IKeyword): boolean {
    return !this.isEmpty(keyword) && !this.isDuplicated(keyword);
  }

  private isEmpty(keyword: IKeyword): boolean {
    return (keyword.name || '').trim().length <= 0;
  }

  private isDuplicated(keyword: IKeyword): boolean {
    return this.localKeywordsSubject.value.some(item => item.name === keyword.name);
  }

  removeKeyword(keyword: IKeyword): void {
    const tempKeywordList = this.localKeywordsSubject.value;
    const index = tempKeywordList.indexOf(keyword);
    if (index >= 0) {
      tempKeywordList.splice(index, 1);
    }
    this.deHightlightKeyword(keyword);
    this.localKeywordsSubject.next(tempKeywordList);
  }

  toggleHighlighter(): void {
    this.isHighlight ? this.hightlightAllKeywords() : this.deHightlightAllKeywords();
  }

  hightlightAllKeywords(): void {
    const allKeywords = this.localKeywordsSubject.value;
    allKeywords.forEach(keyword => this.hightlightKeyword(keyword));
  }

  deHightlightAllKeywords(): void {
    const allKeywords = this.localKeywordsSubject.value;
    allKeywords.forEach(keyword => this.deHightlightKeyword(keyword));
  }

  hightlightKeyword(keyword: IKeyword): void {
    if (!keyword || !keyword.name){
      return;
    }

    const treeWalker = this.document.createTreeWalker(
      this.document.body.getElementsByTagName(defaultConfig.appRoot)[0],
      NodeFilter.SHOW_TEXT,
      // TODO: Allow custom filter?
      null
    );

    let nextNode: Node | (Node & ParentNode) | null = null;
    const matchedNodes: (Node | (Node & ParentNode))[] | null = [];
    // tslint:disable-next-line: no-conditional-assignment
    while (nextNode = treeWalker.nextNode()){
      const nodeValue = nextNode.nodeValue;
      if (nextNode.nodeType === Node.TEXT_NODE && nodeValue?.toLowerCase().indexOf(keyword.name.toLowerCase()) !== -1){
        matchedNodes.push(nextNode);
      }
    }

    if (matchedNodes.length > 100) {
      console.warn('[Warn Message] Matched Too Many');
      return;
    }

    for (const iteratorNode of matchedNodes) {
      nextNode = iteratorNode;
      let parentNode = nextNode.parentNode;
      if (!parentNode){
        parentNode = nextNode as (Node & ParentNode);
        parentNode.nodeValue = '';
      } else if ((parentNode as Element).className === defaultConfig.highlightClass){
        // prevent duplicate highlighting
        continue;
      }

      let keywordParts: string[];
      if (this.config.caseSensitive) {
        keywordParts = (nextNode as Text).data.split(new RegExp(`(${keyword.name})`));
      } else{
        keywordParts = (nextNode as Text).data.split(new RegExp(`(${keyword.name})`, 'i'));
      }

      const newNodes: (Text | HTMLSpanElement)[] = this.createHighlightElements(keywordParts, keyword) || [];

      let insertNode: Text | HTMLSpanElement | undefined;
      // tslint:disable-next-line: no-conditional-assignment
      while (insertNode = newNodes.shift()){
        parentNode.insertBefore(insertNode, nextNode);
      }
      parentNode.removeChild(nextNode);
    }
  }

  createHighlightElements(keywordParts: string[], keyword: IKeyword): (Text | HTMLSpanElement)[] {
    const newElement: (Text | HTMLSpanElement)[] = [];
    for (const iteratorPart of keywordParts) {
      if (!iteratorPart) {
        continue;
      } else if (this.isMatchedKeyword(iteratorPart, keyword)) {
        // create new element node to wrap selection
        const newNode = this.document.createElement('span');
        newNode.className = defaultConfig.highlightClass;
        newNode.innerText = iteratorPart;
        newNode.style.background = keyword.color;
        newNode.style.color = COLOR.WHITE;
        newElement.push(newNode);
      } else {
        // create new text node to place remaining text
        const newTextNode = document.createTextNode(iteratorPart);
        newElement.push(newTextNode);
      }
    }
    return newElement;
  }

  deHightlightKeyword(keyword: IKeyword): void {
    const highlightedElements = document.querySelectorAll(`.${defaultConfig.highlightClass}`);
    highlightedElements.forEach(elm => {
      const highlightedElmement = elm as HTMLElement;
      const highlightedKeyword = highlightedElmement.textContent || '';
      if (this.isMatchedKeyword(highlightedKeyword, keyword)) {
        const parentNode = highlightedElmement.parentNode;
        const textNode = document.createTextNode(highlightedElmement.innerText);
        parentNode?.replaceChild(textNode.cloneNode(false), highlightedElmement);
        // call normalize to combine separated text nodes
        parentNode?.normalize();
      }
    });
  }

  isMatchedKeyword(highlightedKeyword: string, keyword: IKeyword): boolean {
    return (!this.config.caseSensitive && (highlightedKeyword.toLowerCase() === keyword.name.toLowerCase())) ||
    this.config.caseSensitive && (highlightedKeyword === keyword.name);
  }
}
