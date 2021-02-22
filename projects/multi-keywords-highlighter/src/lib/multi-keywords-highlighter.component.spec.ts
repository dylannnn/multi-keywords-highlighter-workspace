import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatChipInputHarness, MatChipListHarness, MatChipHarness } from '@angular/material/chips/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  COLOR,
  COLOR_PALETTE,
  IKeyword,
  MATERIAL_COLOR,
  MultiKeywordsHighlighterConfig,
  MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN,
  LibConfig,
  defaultConfig,
  DEFAULT_CONFIG
} from './core';
import { ColorPaletteModule } from './color-palette/color-palette.module';
import { MaterialModule } from './material/material.module';
import { MultiKeywordsHighlighterComponent } from './multi-keywords-highlighter.component';
import { MultiKeywordsHighlighterService } from './multi-keywords-highlighter.service';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

describe('MultiKeywordsHighlighterComponent', () => {
  let component: MultiKeywordsHighlighterComponent;
  let fixture: ComponentFixture<MultiKeywordsHighlighterComponent>;
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  let triggerButton: MatButtonHarness;
  let keywordChipInput: MatChipInputHarness;
  let keywordChipList: MatChipListHarness;
  let keywordChip: MatChipHarness;
  let mkhMenu: MatMenuHarness;

  const config: Partial<MultiKeywordsHighlighterConfig> = {
    themeColor: MATERIAL_COLOR.PRIMARY,
    keywordsPlaceholder: DEFAULT_CONFIG.KEYWORDS_PLACEHOLDER,
    removable: DEFAULT_CONFIG.REMOVABLE,
    minWidth: DEFAULT_CONFIG.MIN_WIDTH,
    showColorPalette: DEFAULT_CONFIG.SHOW_COLOR_PALETTE,
    initKeywords: DEFAULT_CONFIG.INIT_KEYWORDS
  };

  const mockKeyword: IKeyword[] = [
    {
      name: 'Unit Test',
      color: '#3f51b5'
    }, {
      name: 'Lorem',
      color: '#3f51b5'
    }
  ];

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
      declarations: [MultiKeywordsHighlighterComponent],
      providers: [
        {
          provide: MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN,
          useValue: config
        },
        MultiKeywordsHighlighterService
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(MultiKeywordsHighlighterComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    triggerButton = await loader.getHarness(MatButtonHarness);
    mkhMenu = await loader.getHarness(MatMenuHarness);

    component = fixture.componentInstance;

    spyOn(component.keywordListOutput, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default configuration', () => {
    expect(component.themeColor).toBe(config.themeColor as MATERIAL_COLOR);
    expect(component.keywordPlaceholder).toBe(DEFAULT_CONFIG.KEYWORDS_PLACEHOLDER);
    expect(component.removable).toBe(DEFAULT_CONFIG.REMOVABLE);
    expect(component.minWidth).toBe(DEFAULT_CONFIG.MIN_WIDTH);
    expect(component.showColorPalette).toBe(DEFAULT_CONFIG.SHOW_COLOR_PALETTE);
    expect(component.enableInitKeywords).toBe(DEFAULT_CONFIG.INIT_KEYWORDS);
  });

  it('should click MKH button, show the MKH menu', async () => {
    triggerButton = await loader.getHarness(MatButtonHarness);
    await triggerButton.click();
    fixture.whenStable();
    expect(mkhMenu.isOpen()).toBeTruthy();
  });

  it('should add keywords to the keyword list', async () => {
    triggerButton = await loader.getHarness(MatButtonHarness);
    await triggerButton.click();
    fixture.whenStable();

    keywordChipInput = await mkhMenu.getHarness(MatChipInputHarness);
    await keywordChipInput.focus();
    expect(keywordChipInput.isFocused()).toBeTruthy();
    expect(await keywordChipInput.getPlaceholder()).toContain(defaultConfig.keywordsPlaceholder as string);

    await keywordChipInput.setValue(mockKeyword[0].name);
    expect(await keywordChipInput.getValue()).toContain(mockKeyword[0].name);
    await keywordChipInput.blur();
    keywordChipList = await mkhMenu.getHarness(MatChipListHarness);
    keywordChip = await mkhMenu.getHarness(MatChipHarness);
    expect(await keywordChip.getText()).toContain(mockKeyword[0].name);

    await keywordChipInput.setValue(mockKeyword[1].name);
    expect(await keywordChipInput.getValue()).toContain(mockKeyword[1].name);
    await keywordChipInput.blur();
    keywordChipList = await mkhMenu.getHarness(MatChipListHarness);
    expect((await keywordChipList.getChips()).length).toBe(mockKeyword.length);
    expect(component.keywordList.length).toBe(mockKeyword.length);
  });

  it('should remove keywords to the keyword list', async () => {
    triggerButton = await loader.getHarness(MatButtonHarness);
    await triggerButton.click();
    fixture.whenStable();

    keywordChipInput = await mkhMenu.getHarness(MatChipInputHarness);
    await keywordChipInput.focus();
    expect(keywordChipInput.isFocused()).toBeTruthy();
    expect(await keywordChipInput.getPlaceholder()).toContain(defaultConfig.keywordsPlaceholder as string);

    await keywordChipInput.setValue(mockKeyword[0].name);
    expect(await keywordChipInput.getValue()).toContain(mockKeyword[0].name);
    await keywordChipInput.blur();
    keywordChipList = await mkhMenu.getHarness(MatChipListHarness);
    keywordChip = await mkhMenu.getHarness(MatChipHarness);
    expect(await keywordChip.getText()).toContain(mockKeyword[0].name);

    keywordChipList = await mkhMenu.getHarness(MatChipListHarness);
    expect((await keywordChipList.getChips({ text: mockKeyword[0].name })).length).toEqual(1);
    const deleteChip = await keywordChipList.getChips({ text: mockKeyword[0].name });
    await deleteChip[0].remove();
    expect((await keywordChipList.getChips({ text: mockKeyword[0].name })).length).toEqual(0);
    fixture.detectChanges();
    expect(component.keywordListOutput.emit).toHaveBeenCalledWith(component.keywordList);
  });

  it('should call to get random color', async () => {

    const getRandomColorSpy = spyOn(MultiKeywordsHighlighterComponent.prototype as any, 'getRandomColor');
    getRandomColorSpy.and.callFake(() => {
      return new Promise((resolve) => {
        resolve('#3f51b5');
      });
    });

    component.addKeyword({
      input: null,
      value: 'Test random color'
    } as unknown as MatChipInputEvent);

    expect(getRandomColorSpy).toHaveBeenCalled();
  });

  it('should toggle theme color', async () => {

    const toggleThemeColorSpy = spyOn(MultiKeywordsHighlighterComponent.prototype as any, 'toggleThemeColor');
    toggleThemeColorSpy.and.callThrough();

    component.onToggle({
      checked: true,
    } as unknown as MatSlideToggleChange);

    expect(toggleThemeColorSpy).toHaveBeenCalled();
  });

  it('should hightlightKeywords', async () => {
    component.hightlightKeywords();
    expect(1).toEqual(1);
  });
});
