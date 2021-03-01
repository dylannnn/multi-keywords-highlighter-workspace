import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import {
  MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN,
  MATERIAL_COLOR,
  MultiKeywordsHighlighterConfig,
  MultiKeywordsHighlighterConstants,
  IKeyword
} from './core';
import { MultiKeywordsHighlighterService } from './multi-keywords-highlighter.service';

const mockKeyword: IKeyword[] = [
  {
    name: 'Unit Test',
    color: '#3f51b5'
  }, {
    name: 'Lorem',
    color: '#3f51b5'
  }, {
    name: 'ornare',
    color: '#3f51b5'
  }
];
const mockInvalidKeyword = {} as IKeyword;
const mockDocument = document;

describe('MultiKeywordsHighlighterService', () => {
  let service: MultiKeywordsHighlighterService;
  let isValidKeywordSpy: any;
  let hightlightAllKeywordsSpy: any;
  let hightlightKeywordSpy: any;
  let deHightlightAllKeywordsSpy: any;
  let deHightlightKeywordSpy: any;
  let toggleHighlighterSpy: any;
  let createTreeWorkerSpy: any;
  const config: Partial<MultiKeywordsHighlighterConfig> = {
    themeColor: MATERIAL_COLOR.PRIMARY,
    highlightClass: MultiKeywordsHighlighterConstants.HIGHLIGHT_CLASS
  };

  const mockContent = document.createElement('p');
  mockContent.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare sem sit amet dapibus sodales. Quisque porta viverra massa, vel tempus ipsum hendrerit in. Phasellus pulvinar metus erat, non commodo lectus gravida et.';
  mockContent.style.display = 'flex';
  mockContent.style.border = '1px solid';
  mockContent.style.padding = '10px';
  mockContent.style.margin = '15px';
  mockContent.style.marginTop = '30px';

  const insertTarget = document.body;
  if (insertTarget) {
    insertTarget.appendChild(mockContent);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DOCUMENT,
          useValue: mockDocument
        },
        {
          provide: MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN,
          useValue: config
        }
      ]
    });
    service = TestBed.inject(MultiKeywordsHighlighterService);
    // isValidKeywordSpy = spyOn(service, 'isValidKeyword');
    // hightlightAllKeywordsSpy = spyOn(service, 'hightlightAllKeywords');
    // hightlightKeywordSpy = spyOn(service, 'hightlightKeyword');
    // deHightlightAllKeywordsSpy = spyOn(service, 'deHightlightAllKeywords');
    // deHightlightKeywordSpy = spyOn(service, 'deHightlightKeyword');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get injected theme color', () => {
    expect(service.config.themeColor).toBe(config.themeColor as MATERIAL_COLOR);
  });

  it('should toggle highlight status and get status text', async () => {
    service.toggleHighlightStatus(true);
    service.highlightedStatus$.subscribe(status => {
      expect(status).toBeTrue();
    }).unsubscribe();
    service.highlightedStatusText$.subscribe(statusText => {
      expect(statusText).toBe(MultiKeywordsHighlighterConstants.HIGHLIGHTER.ON);
    }).unsubscribe();
    expect(service.isHighlight).toBeTrue();

    service.toggleHighlightStatus(false);
    service.highlightedStatus$.subscribe(status => {
      expect(status).toBeFalse();
    }).unsubscribe();
    service.highlightedStatusText$.subscribe(statusText => {
      expect(statusText).toBe(MultiKeywordsHighlighterConstants.HIGHLIGHTER.OFF);
    }).unsubscribe();
    expect(service.isHighlight).toBeFalse();
  });

  it('should not add invalid keyword', async () => {
    isValidKeywordSpy = spyOn(service, 'isValidKeyword').and.returnValue(false);
    service.addKeyword(mockInvalidKeyword);
    expect(isValidKeywordSpy).toHaveBeenCalled();
    expect(service.localKeywordsSubject.value.length).toEqual(0);
  });

  it('should add valid keyword to the stream', async () => {
    isValidKeywordSpy = spyOn(service, 'isValidKeyword').and.returnValue(true);
    hightlightKeywordSpy = spyOn(service, 'hightlightKeyword');

    service.highlightedStatusSubject.next(true);
    service.addKeyword(mockKeyword[0]);
    expect(service.isHighlight).toBeTrue();
    expect(isValidKeywordSpy).toHaveBeenCalled();
    expect(isValidKeywordSpy).toHaveBeenCalledOnceWith(mockKeyword[0]);
    expect(hightlightKeywordSpy).toHaveBeenCalledWith(mockKeyword[0]);
    expect(service.localKeywordsSubject.value.length).toEqual(1);
  });

  it('should validate a keyword', async () => {
    expect(service.isValidKeyword(mockInvalidKeyword)).toBeFalse();
    expect(service.isValidKeyword(mockKeyword[0])).toBeTrue();
  });

  it('should check a keyword is empty', async () => {
    expect(service.isEmpty(mockInvalidKeyword)).toBeTrue();
    expect(service.isEmpty(mockKeyword[0])).toBeFalse();
  });

  it('should check a keyword is duplicated', async () => {
    service.localKeywordsSubject.next(mockKeyword);
    expect(service.isDuplicated(mockInvalidKeyword)).toBeFalse();
    expect(service.isDuplicated({name: 'Amfrontender'} as IKeyword)).toBeFalse();
    expect(service.isDuplicated(mockKeyword[0])).toBeTrue();
  });

  it('should not remove a new keyword', async () => {
    deHightlightKeywordSpy = spyOn(service, 'deHightlightKeyword');
    service.addKeyword(mockKeyword[0]);
    service.removeKeyword(mockKeyword[1]);
    expect(service.localKeywordsSubject.value).toContain(mockKeyword[0]);
    expect(service.localKeywordsSubject.value).not.toContain(mockKeyword[1]);
    expect(deHightlightKeywordSpy).toHaveBeenCalledWith(mockKeyword[1]);
  });

  it('should remove an existing keyword', async () => {
    deHightlightKeywordSpy = spyOn(service, 'deHightlightKeyword');
    service.addKeyword(mockKeyword[0]);
    service.addKeyword(mockKeyword[1]);
    service.removeKeyword(mockKeyword[1]);
    expect(service.localKeywordsSubject.value).toContain(mockKeyword[0]);
    expect(service.localKeywordsSubject.value).not.toContain(mockKeyword[1]);
    expect(deHightlightKeywordSpy).toHaveBeenCalledWith(mockKeyword[1]);
  });

  it('should toggle highlighter', async () => {
    hightlightAllKeywordsSpy = spyOn(service, 'hightlightAllKeywords');
    deHightlightAllKeywordsSpy = spyOn(service, 'deHightlightAllKeywords');
    toggleHighlighterSpy = spyOn(service, 'toggleHighlighter').and.callThrough();
    createTreeWorkerSpy = spyOn(service, 'createTreeWorker');
    service.highlightedStatusSubject.next(true);
    expect(service.isHighlight).toBeTrue();
    service.toggleHighlighter();
    expect(toggleHighlighterSpy).toHaveBeenCalled();
    expect(hightlightAllKeywordsSpy).toHaveBeenCalled();

    service.highlightedStatusSubject.next(false);
    expect(service.isHighlight).toBeFalse();
    service.toggleHighlighter();
    expect(toggleHighlighterSpy).toHaveBeenCalled();
    expect(deHightlightAllKeywordsSpy).toHaveBeenCalled();
  });

  it('should hightlight all keywords', async () => {
    hightlightKeywordSpy = spyOn(service, 'hightlightKeyword');
    service.addKeyword(mockKeyword[0]);
    service.addKeyword(mockKeyword[1]);
    service.addKeyword(mockKeyword[2]);
    expect(service.localKeywordsSubject.value).toEqual(mockKeyword);
    service.hightlightAllKeywords();
    expect(hightlightKeywordSpy).toHaveBeenCalledTimes(mockKeyword.length);
  });

  it('should de-hightlight all keywords', async () => {
    deHightlightKeywordSpy = spyOn(service, 'deHightlightKeyword');
    service.addKeyword(mockKeyword[0]);
    service.addKeyword(mockKeyword[1]);
    service.addKeyword(mockKeyword[2]);
    expect(service.localKeywordsSubject.value).toEqual(mockKeyword);
    service.deHightlightAllKeywords();
    expect(deHightlightKeywordSpy).toHaveBeenCalledTimes(mockKeyword.length);
  });

  it('should hightlight a keyword', async () => {
    const mockTreeWalker: TreeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    createTreeWorkerSpy = spyOn(service, 'createTreeWorker').and.returnValue(mockTreeWalker);
    service.hightlightKeyword(mockKeyword[2]);
    expect(createTreeWorkerSpy).toHaveBeenCalled();

    const mockHighlighKeywordElement = document.getElementsByClassName(config.highlightClass as string);
    expect(mockHighlighKeywordElement.length).toBeGreaterThanOrEqual(1);
  });

  it('should create a tree Worker', async () => {
    createTreeWorkerSpy = spyOn(service, 'createTreeWorker').and.callThrough();
    service.createTreeWorker(document.body);
    expect(createTreeWorkerSpy).toHaveBeenCalledOnceWith(document.body);
  });

  it('should create highlight elements', async () => {
    const mockKeywordParts = ['lorem', 'nare'];
    const highlightElement = service.createHighlightElements(mockKeywordParts, mockKeyword[2]);
    highlightElement.forEach(element => {
      expect(element).toBeInstanceOf(Text);
    });
  });

  it('should de hightlight keyword', async () => {
    const mockTreeWalker: TreeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    createTreeWorkerSpy = spyOn(service, 'createTreeWorker').and.returnValue(mockTreeWalker);
    service.hightlightKeyword(mockKeyword[2]);
    expect(createTreeWorkerSpy).toHaveBeenCalled();

    service.deHightlightKeyword(mockKeyword[2]);
    const mockHighlighKeywordElement = document.getElementsByClassName(config.highlightClass as string);
    expect(mockHighlighKeywordElement.length).toBeLessThan(1);
  });

  it('should find a matched keyword', async () => {
    expect(service.isMatchedKeyword(mockKeyword[0].name, mockKeyword[1])).toBeFalse();
    expect(service.isMatchedKeyword(mockKeyword[1].name, mockKeyword[1])).toBeTrue();
  });
});
