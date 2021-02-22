import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IKeyword, MATERIAL_COLOR, MultiKeywordsHighlighterConfig } from './core';
import { MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN } from './core/multi-keywords-highlighter.config.token';

@Injectable({
  providedIn: 'root'
})
export class MultiKeywordsHighlighterService {
  private defaultColor: MATERIAL_COLOR;
  private localKeywordsSubject  = new BehaviorSubject<IKeyword[]>([]);
  localKeywords$ = this.localKeywordsSubject.asObservable();

  constructor(
    @Inject(MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN) private multiKeywordsHighlighterConfig: Partial<MultiKeywordsHighlighterConfig>
  ) {
    this.defaultColor = this.multiKeywordsHighlighterConfig.themeColor || MATERIAL_COLOR.PRIMARY;
  }

  get themeColor(): MATERIAL_COLOR {
    return this.defaultColor;
  }
}
