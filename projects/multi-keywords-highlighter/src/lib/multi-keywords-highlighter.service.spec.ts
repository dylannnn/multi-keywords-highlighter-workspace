import { TestBed } from '@angular/core/testing';

import {
  MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN,
  MATERIAL_COLOR,
  MultiKeywordsHighlighterConfig
} from './core';
import { MultiKeywordsHighlighterService } from './multi-keywords-highlighter.service';

describe('MultiKeywordsHighlighterService', () => {
  let service: MultiKeywordsHighlighterService;
  const config: Partial<MultiKeywordsHighlighterConfig> = {
    themeColor: MATERIAL_COLOR.PRIMARY
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN,
          useValue: config
        }
      ]
    });
    service = TestBed.inject(MultiKeywordsHighlighterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get injected theme color', () => {
    expect(service.themeColor).toBe(MATERIAL_COLOR.PRIMARY);
  });
});
