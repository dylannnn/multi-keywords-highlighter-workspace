import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  IKeyword,
  MATERIAL_COLOR,
  LibConfig,
  MultiKeywordsHighlighterConfig
} from './core';
import { ICON_COLOR_LENS, ICON_HIGHLIGHT } from './material';
import { MultiKeywordsHighlighterService } from './multi-keywords-highlighter.service';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiKeywordsHighlighterComponent implements OnInit {
  /**
   * Material theme color for Button, badge and toggle button
   */
  themeColor: MATERIAL_COLOR = MATERIAL_COLOR.PRIMARY;

  /**
   * Output event for keywords list
   * @returns IKeyword[]
   */
  @Output() initialized: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Output event for keywords list
   * @returns IKeyword[]
   */
  @Output() keywordListOutput: EventEmitter<IKeyword[]> = new EventEmitter<IKeyword[]>();

  /**
   * Output event for highlighted status
   * @returns boolean
   */
  @Output() highlighted: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Output event for on Open Menu
   * @returns boolean
   */
  @Output() openMenu: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Output event for on Close Menu
   * @returns boolean
   */
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Copyright year
   */
  readonly currentYear: Date = new Date();

  /**
   * Separator keys codes
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * Keyword quantity shows on badge
   */
  keywordQuantity = 0;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private mService: MultiKeywordsHighlighterService
  ) {
    iconRegistry.addSvgIconLiteral('highlight', sanitizer.bypassSecurityTrustHtml(ICON_HIGHLIGHT));
    iconRegistry.addSvgIconLiteral('color_lens', sanitizer.bypassSecurityTrustHtml(ICON_COLOR_LENS));
  }

  ngOnInit(): void {
    this.initialized.emit(true);
  }

  /**
   * Copyright
   */
  get copyright(): string {
    return LibConfig.COPYRIGHT_AUTHOR;
  }

  /**
   * Copyright link
   */
  get copyrightLink(): string {
    return LibConfig.COPYRIGHT_CONTACT;
  }

  /**
   * Library name
   */
  get appName(): string {
    return LibConfig.APP_NAME;
  }

  /**
   * Library version
   */
  get appVersion(): string {
    return LibConfig.APP_VERSION;
  }

  /**
   * Library configuration
   */
  get config(): MultiKeywordsHighlighterConfig {
    return this.mService.config;
  }

  /**
   * Number of keywords
   */
  get countKeywords(): number {
    return this.keywordQuantity;
  }

  /**
   * Highlighted stauts text
   */
  get highlightedStautsText(): Observable<string> {
    return this.mService.highlightedStatusText$;
  }

  /**
   * Keyword list
   */
  get keywordList$(): Observable<IKeyword[]> {
    return this.mService.localKeywords$.pipe(
      tap(keywordList => {
        this.keywordQuantity = keywordList.length;
      })
    );
  }

  /**
   * On keywords highlighter opened event
   */
  onOpened(): void {
    this.openMenu.emit(true);
  }

  /**
   * On keywords highlighter closed event
   */
  onClosed(): void {
    this.openMenu.emit(true);
  }

  /**
   * On check the highlighter checkbox
   * @param event MatSlideToggleChange
   */
  onToggle(event: MatSlideToggleChange): void {
    this.mService.toggleHighlightStatus(event.checked);
    this.mService.toggleHighlighter();
    this.highlighted.emit(event.checked);
    event.checked ? this.themeColor = MATERIAL_COLOR.ACCENT : this.themeColor = MATERIAL_COLOR.PRIMARY;
  }

  /**
   * Add a keyword
   * @param event MatChipInputEvent
   */
  addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (event.value) {
      const tempKeyword: IKeyword = {
        name: value.trim(),
        color: this.getRandomColor()
      };

      this.mService.addKeyword(tempKeyword);
      this.keywordListOutput.emit(this.mService.localKeywordsSubject.value);

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
    this.mService.removeKeyword(keyword);
    this.keywordListOutput.emit(this.mService.localKeywordsSubject.value);
  }

  /**
   * Get a random color from the color palette
   */
  private getRandomColor(): string {
    return this.config.colorPalette[Math.floor((Math.random() * this.config.colorPalette.length))];
  }
}
