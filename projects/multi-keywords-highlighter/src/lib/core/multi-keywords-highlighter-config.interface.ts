import { LABEL_POSITION, MATERIAL_COLOR } from './multi-keywords-highlighter.constants';

/**
 * Multi Keywords Highlighter Configuration
 * @ignore
 */
export interface MultiKeywordsHighlighterConfig {
  themeColor: MATERIAL_COLOR;
  keywordsPlaceholder: string;
  removable: boolean;
  minWidth: number;
  toggleLabelPosition: LABEL_POSITION;
  enableToggleLabel: boolean;
  enableHighlighterTooltip: string;
  enableColorPalette: boolean;
  initKeywords: boolean;
  colorPalette: string[];
  chipTextColor: string;
  chipIconColor: string;
  linkToCopyright: boolean;
  caseSensitive: boolean;
  minSearchLength: number;
  appRoot: string;
  highlightClass: string;
}
