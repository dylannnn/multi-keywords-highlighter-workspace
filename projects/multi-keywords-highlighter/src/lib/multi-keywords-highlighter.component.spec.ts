import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MULTI_KEYWORDS_HIGHLIGHTER_CONFIG,
  MATERIAL_COLOR,
  MultiKeywordsHighlighterConfig
} from './core';
import { ColorPaletteModule } from './color-palette/color-palette.module';
import { MaterialModule } from './material/material.module';
import { MultiKeywordsHighlighterComponent } from './multi-keywords-highlighter.component';

describe('MultiKeywordsHighlighterComponent', () => {
  let component: MultiKeywordsHighlighterComponent;
  let fixture: ComponentFixture<MultiKeywordsHighlighterComponent>;
  const config: MultiKeywordsHighlighterConfig = {
    themeColor: MATERIAL_COLOR.PRIMARY
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        ColorPaletteModule
      ],
      declarations: [ MultiKeywordsHighlighterComponent ],
      providers: [
        {
          provide: MULTI_KEYWORDS_HIGHLIGHTER_CONFIG,
          useValue: config
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiKeywordsHighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
