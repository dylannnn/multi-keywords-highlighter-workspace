import { MATERIAL_COLOR } from './multi-keywords-highlighter.constants';

export interface MultiKeywordsHighlighterConfig {
  themeColor: MATERIAL_COLOR;
  keywordsPlaceholder: string;
  removable: boolean;
  minWidth: number;
  showColorPalette: boolean;
  initKeywords: boolean;
}
