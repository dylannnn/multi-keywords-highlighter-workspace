import { COLOR, COLOR_PALETTE } from './color-palette.const';
import { MultiKeywordsHighlighterConfig } from './multi-keywords-highlighter-config.interface';
import { LABEL_POSITION, MATERIAL_COLOR, MultiKeywordsHighlighterConstants } from './multi-keywords-highlighter.constants';

export const defaultConfig: MultiKeywordsHighlighterConfig = {
  themeColor: MATERIAL_COLOR.PRIMARY,
  colorPalette: COLOR_PALETTE.DEFAULT,
  keywordsPlaceholder: MultiKeywordsHighlighterConstants.KEYWORDS_PLACEHOLDER,
  removable: MultiKeywordsHighlighterConstants.REMOVABLE,
  minWidth: MultiKeywordsHighlighterConstants.MIN_WIDTH,
  toggleLabelPosition: LABEL_POSITION.AFTER,
  enableToggleLabel: MultiKeywordsHighlighterConstants.ENABLE_TOGGLE_LABEL,
  enableHighlighterTooltip: MultiKeywordsHighlighterConstants.ENABLE_HIGHLIGHTER_TOOLTIP,
  enableColorPalette: MultiKeywordsHighlighterConstants.ENABLE_COLOR_PALETTE,
  initKeywords: MultiKeywordsHighlighterConstants.INIT_KEYWORDS,
  chipTextColor: COLOR.WHITE,
  chipIconColor: COLOR.WHITE,
  linkToCopyright: true,
  caseSensitive: false,
  minSearchLength: MultiKeywordsHighlighterConstants.MIN_SEARCH_LENGTH,
  appRoot: MultiKeywordsHighlighterConstants.APP_ROOT,
  highlightClass: MultiKeywordsHighlighterConstants.HIGHLIGHT_CLASS
};
