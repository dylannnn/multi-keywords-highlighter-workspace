import { TestBed } from '@angular/core/testing';

import { MultiKeywordsHighlighterService } from './multi-keywords-highlighter.service';

describe('MultiKeywordsHighlighterService', () => {
  let service: MultiKeywordsHighlighterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiKeywordsHighlighterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
