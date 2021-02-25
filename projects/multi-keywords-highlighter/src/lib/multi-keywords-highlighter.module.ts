import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiKeywordsHighlighterConfig, MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN } from './core';
import { ColorPaletteModule } from './color-palette/color-palette.module';
import { MaterialModule } from './material/material.module';
import { MultiKeywordsHighlighterComponent } from './multi-keywords-highlighter.component';

@NgModule({
  declarations: [ MultiKeywordsHighlighterComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ColorPaletteModule
  ],
  exports: [ MultiKeywordsHighlighterComponent ]
})
export class MultiKeywordsHighlighterModule {
  constructor(@Optional() @SkipSelf() parentModule?: MultiKeywordsHighlighterModule) {
    if (parentModule) {
      throw new Error('MultiKeywordsHighlighterModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: Partial<MultiKeywordsHighlighterConfig>): ModuleWithProviders<MultiKeywordsHighlighterModule> {
    return {
      ngModule: MultiKeywordsHighlighterModule,
      providers: [
        {
          provide: MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN,
          useValue: config
        }
      ]
    };
  }
}
