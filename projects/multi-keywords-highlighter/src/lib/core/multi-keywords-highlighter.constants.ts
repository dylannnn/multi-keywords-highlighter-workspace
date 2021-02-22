import { MultiKeywordsHighlighterConfig } from './multi-keywords-highlighter-config.interface';

export const NAME_SPACE = {
  KEYWORDS: 'MH_KEYWORDS',
  HIGHLIGHTED: 'MH_HIGHLIGHTED',
  HIGHLIGHT_STATUS: 'MH_HIGHLIGHT_STATUS'
};

export const DEFAULT_CONFIG = {
  APP_NAME: 'Multi keywords highlighter',
  APP_VERSION: '0.0.1',
  COPYRIGHT: {
    AUTHOR: 'Amfrontender',
    CONTACT: 'https://github.com/Amfrontender'
  },
  KEYWORDS_PLACEHOLDER: 'Keywords...',
  REMOVABLE: true,
  MIN_WIDTH: 340,
  SHOW_COLOR_PALETTE: false,
  INIT_KEYWORDS: true
};

export class LibConfig {
  static readonly APP_NAME = DEFAULT_CONFIG.APP_NAME;
  static readonly APP_VERSION = DEFAULT_CONFIG.APP_VERSION;
  static readonly COPYRIGHT_AUTHOR = DEFAULT_CONFIG.COPYRIGHT.AUTHOR;
  static readonly COPYRIGHT_CONTACT = DEFAULT_CONFIG.COPYRIGHT.CONTACT;
}

export const defaultConfig: Partial<MultiKeywordsHighlighterConfig> = {
  keywordsPlaceholder: DEFAULT_CONFIG.KEYWORDS_PLACEHOLDER,
  removable: DEFAULT_CONFIG.REMOVABLE,
  minWidth: DEFAULT_CONFIG.MIN_WIDTH,
  showColorPalette: DEFAULT_CONFIG.SHOW_COLOR_PALETTE,
  initKeywords: DEFAULT_CONFIG.INIT_KEYWORDS
};

export enum MATERIAL_COLOR {
  PRIMARY = 'primary',
  ACCENT = 'accent',
  WARN = 'warn'
}

export const COLOR = {
  WHITE: '#ffffff'
};

export const COLOR_PALETTE = {
  DEFAULT: [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
    '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722'
  ],
  FLAT: [
    '#FFC312', '#F79F1F', '#EE5A24', '#EA2027', '#C4E538',
    '#A3CB38', '#009432', '#006266', '#12CBC4', '#1289A7',
    '#0652DD', '#1B1464', '#FDA7DF', '#D980FA', '#9980FA',
    '#5758BB', '#ED4C67', '#B53471', '#833471', '#6F1E51'
  ]
};
