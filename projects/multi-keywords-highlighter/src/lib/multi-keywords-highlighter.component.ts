import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { COLOR, COLOR_PALETTE, CONFIG, IKeyword, MATERIAL_COLOR } from './core';
import { MultiKeywordsHighlighterService } from './multi-keywords-highlighter.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatChipInputEvent } from '@angular/material/chips';

/**
 * Multi keywords highlighter
 *
 * Usage:
 *
 * ```html
 * <lib-multi-keywords-highlighter [input options] (output events) ... ></lib-multi-keywords-highlighter>
 * ```
 */
@Component({
  selector: 'lib-multi-keywords-highlighter',
  templateUrl: './multi-keywords-highlighter.component.html',
  styleUrls: ['./multi-keywords-highlighter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiKeywordsHighlighterComponent implements OnInit {
  /**
   * Copyright
   */
  @Input() copyright = CONFIG.COPYRIGHT.AUTHOR;

  /**
   * Material theme color
   *
   * - 'primary'
   * - 'accent'
   * - 'warn'
   */
  @Input() materialThemeColor: MATERIAL_COLOR; // = MATERIAL_COLOR.PRIMARY

  /**
   * Color palette
   *
   * *Support color keyword, HEX, RGB, RGBA, HSL, HSLA*
   *
   */
  @Input() colorPalette: string[] = COLOR_PALETTE.DEFAULT;

  /**
   * Keyword Placeholder
   * @description The placeholder text for the input field of the keyword.
   */
  @Input() keywordPlaceholder = CONFIG.KEYWORDS_PLACEHOLDER;

  /**
   * Chip text color
   */
  @Input() chipTextColor = COLOR.WHITE;

  /**
   * Chip icon color
   */
  @Input() chipIconColor = COLOR.WHITE;

  /**
   * Is chip removable?
   */
  @Input() removable = CONFIG.REMOVABLE;

  /**
   * Minium width of this widget
   */
  @Input() minWidth = CONFIG.MIN_WIDTH;

  /**
   * Enable to show color palette widget
   */
  @Input() showColorPalette = CONFIG.SHOW_COLOR_PALETTE;

  /**
   * Keywords list
   */
  @Input() keywordList: IKeyword[] = [];

  /**
   * Enable Init Keywords
   */
  @Input() enableInitKeywords = CONFIG.INIT_KEYWORDS;

  /**
   * Is library initialized
   */
  private initialized = false;

  /**
   * Output event for keywords list
   */
  @Output() keywordListOutput: EventEmitter<IKeyword[]> = new EventEmitter<IKeyword[]>();

  /**
   * Keyword quantity
   */
  keywordQuantity = 0;

  /**
   * Is highlighted, check the highlighted checkbox
   */
  isHighlighted = false;

  /**
   * Copyright year
   */
  readonly currentYear: Date = new Date();

  /**
   * Separator keys codes
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private mService: MultiKeywordsHighlighterService
  ) {
    this.materialThemeColor = this.mService.themeColor;
  }

  ngOnInit(): void {
  }

  /**
   * Getter - Get theme color
   */
  get themeColor(): string {
    return this.materialThemeColor;
  }

  /**
   * Getter - Get keyword Count
   */
  get keywordCount(): number {
    return this.keywordQuantity;
  }

  get appName(): string {
    return CONFIG.APP_NAME;
  }

  get appVersion(): string {
    return CONFIG.APP_VERSION ? `v${CONFIG.APP_VERSION}` : '';
  }

  /**
   * Display the keywords highlighter
   */
  showHighlighter(): void {}

  /**
   * On keywords highlighter closed event
   */
  onClosed(): void {}

  /**
   * On keywords highlighter opened event
   */
  onOpened(): void {}

  /**
   * Add a keyword
   * @param event MatChipInputEvent
   */
  addKeyword(event: MatChipInputEvent): void {
    console.log('[LIB - Add Keyword] - ', event);
    const input = event.input;
    const value = event.value;
    let isDuplicatedKeyword = false;
    if (event.value) {
      const keyword: IKeyword = {
        name: value.trim(),
        color: this.getRandomColor()
      };

      // this.mService.localKeywords$.subscribe(keywords => {
      //   console.log('[LIB - Add Keyword] Observable keywords: ', keywords);
      //   if (keywords) {
      //     keywords.map(ikeyword => {
      //       if (ikeyword.name === keyword.name) {
      //         isDuplicatedKeyword = true;
      //       }
      //     });
      //   }
      // });
      if (!isDuplicatedKeyword) {
        if ((value || '').trim()) {
          this.keywordList.push(keyword);
          // this.mService.addKeyword(keyword);
          this.keywordListOutput.emit(this.keywordList);
        }
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  /**
   * Remove a keyword from the list
   * @param keyword Keyword to remove
   */
  removeKeyword(keyword: IKeyword): void {
    const index = this.keywordList.indexOf(keyword);
    if (index >= 0) {
      this.keywordList.splice(index, 1);
    }
    // this.mService.deleteKeyword(keyword);
    this.keywordListOutput.emit(this.keywordList);
  }

  /**
   * Get a random color from the color palette
   */
  private getRandomColor(): string {
    return this.colorPalette[Math.floor((Math.random() * this.colorPalette.length))];
  }

  /**
   * On check the highlighter checkbox
   * @param event Material slide toggle event
   */
  onToggle(event: MatSlideToggleChange): void {
    console.log('onHighlight: ', event.checked);
    this.toggleLibTheme(event.checked);
    // this.mService.toggleHighlighter(event.checked);
    // event.checked ?
    //   this.materialThemeColor = MATERIAL_COLOR.ACCENT :
    //   this.materialThemeColor = MATERIAL_COLOR.PRIMARY;
    // if (event.checked) {
    //   this.materialThemeColor = MATERIAL_COLOR.ACCENT;
    //   // TODO: To enable highlighter
    // } else {
    //   this.materialThemeColor = MATERIAL_COLOR.PRIMARY;
    //   // TODO: To disable highlighter
    // }
  }

  private toggleLibTheme(state: boolean): void {
    state ?
      this.materialThemeColor = MATERIAL_COLOR.ACCENT :
      this.materialThemeColor = MATERIAL_COLOR.PRIMARY;
  }

  hightlightKeywords(): void {
    console.log('[LIB - hightlightKeywords]');
  }
}
