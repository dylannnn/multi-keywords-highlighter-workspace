import { Inject, Injectable } from '@angular/core';
import { MATERIAL_COLOR, MultiKeywordsHighlighterConfig } from './core';
import { MULTI_KEYWORDS_HIGHLIGHTER_CONFIG } from './core/multi-keywords-highlighter.config.token';

@Injectable({
  providedIn: 'root'
})
export class MultiKeywordsHighlighterService {
  private defaultColor: MATERIAL_COLOR = MATERIAL_COLOR.PRIMARY;
  constructor(@Inject(MULTI_KEYWORDS_HIGHLIGHTER_CONFIG) private multiKeywordsHighlighterConfig: MultiKeywordsHighlighterConfig) {
    this.defaultColor = this.multiKeywordsHighlighterConfig.themeColor;
  }

  get themeColor(): MATERIAL_COLOR {
    return this.defaultColor;
  }
}
