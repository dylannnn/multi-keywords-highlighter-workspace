import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiKeywordsHighlighterConfig } from './core';
import { MULTI_KEYWORDS_HIGHLIGHTER_CONFIG } from './core/multi-keywords-highlighter.config.token';
import { MaterialModule } from './material/material.module';
import { ColorPaletteModule } from './color-palette/color-palette.module';
import { MultiKeywordsHighlighterComponent } from './multi-keywords-highlighter.component';

@NgModule({
  declarations: [MultiKeywordsHighlighterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ColorPaletteModule
  ],
  exports: [MultiKeywordsHighlighterComponent]
})
export class MultiKeywordsHighlighterModule {
  constructor(@Optional() @SkipSelf() parentModule?: MultiKeywordsHighlighterModule) {
    if (parentModule) {
      throw new Error('MultiKeywordsHighlighterModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: MultiKeywordsHighlighterConfig): ModuleWithProviders<MultiKeywordsHighlighterModule> {
    return {
      ngModule: MultiKeywordsHighlighterModule,
      providers: [
        {
          provide: MULTI_KEYWORDS_HIGHLIGHTER_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
