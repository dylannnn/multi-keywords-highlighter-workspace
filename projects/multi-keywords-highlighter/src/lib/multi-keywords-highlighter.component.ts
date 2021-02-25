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
import { COLOR_LENS, HIGHLIGHT_ICON } from './material';
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
  themeColor: MATERIAL_COLOR = MATERIAL_COLOR.PRIMARY;

  /**
   * Output event for keywords list
   */
  @Output() keywordListOutput: EventEmitter<IKeyword[]> = new EventEmitter<IKeyword[]>();

  /**
   * Output event for highlighted status
   */
  @Output() highlighted: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Copyright year
   */
  readonly currentYear: Date = new Date();

  /**
   * Separator keys codes
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  keywordQuantity = 0;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private mService: MultiKeywordsHighlighterService
  ) {
    iconRegistry.addSvgIconLiteral('highlight', sanitizer.bypassSecurityTrustHtml(HIGHLIGHT_ICON));
    iconRegistry.addSvgIconLiteral('color_lens', sanitizer.bypassSecurityTrustHtml(COLOR_LENS));
  }

  ngOnInit(): void {
  }

  /**
   * Copyright Amfrontender
   */
  get copyright(): string {
    return LibConfig.COPYRIGHT_AUTHOR;
  }

  get copyrightLink(): string {
    return LibConfig.COPYRIGHT_CONTACT;
  }

  get appName(): string {
    return LibConfig.APP_NAME;
  }

  get appVersion(): string {
    return LibConfig.APP_VERSION;
  }

  get config(): MultiKeywordsHighlighterConfig {
    return this.mService.config;
  }

  get countKeywords(): number {
    return this.keywordQuantity;
  }

  get highlightedStauts(): Observable<string> {
    return this.mService.highlightedStatusText$;
  }

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
  onOpened(): void {}

  /**
   * On keywords highlighter closed event
   */
  onClosed(): void {}

  /**
   * On check the highlighter checkbox
   * @param event Material slide toggle event
   */
  onToggle(event: MatSlideToggleChange): void {
    console.log('onToggleHighlight: ', event.checked);
    this.mService.toggleHighlight(event.checked);
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
    return;
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
