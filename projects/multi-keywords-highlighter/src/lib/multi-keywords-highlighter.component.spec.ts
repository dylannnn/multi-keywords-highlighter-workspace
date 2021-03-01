import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatChipInputHarness, MatChipListHarness, MatChipHarness } from '@angular/material/chips/testing';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  IKeyword,
  MATERIAL_COLOR,
  MultiKeywordsHighlighterConfig,
  MULTI_KEYWORDS_HIGHLIGHTER_CONFIG_TOKEN,
  defaultConfig,
  MultiKeywordsHighlighterConstants
} from './core';
import { ColorPaletteModule } from './color-palette/color-palette.module';
import { MaterialModule } from './material/material.module';
import { MultiKeywordsHighlighterComponent } from './multi-keywords-highlighter.component';
import { MultiKeywordsHighlighterService } from './multi-keywords-highlighter.service';


describe('MultiKeywordsHighlighterComponent', () => {
  let component: MultiKeywordsHighlighterComponent;
  let fixture: ComponentFixture<MultiKeywordsHighlighterComponent>;
  let mService: MultiKeywordsHighlighterService;
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  let triggerButton: MatButtonHarness;
  let keywordChipInput: MatChipInputHarness;
  let keywordChipList: MatChipListHarness;
  let keywordChip: MatChipHarness;
  let mkhMenu: MatMenuHarness;

  const mockConfig: Partial<MultiKeywordsHighlighterConfig> = {
    themeColor: MATERIAL_COLOR.PRIMARY,
    keywordsPlaceholder: defaultConfig.keywordsPlaceholder,
    removable: defaultConfig.removable,
    minWidth: defaultConfig.minWidth,
    enableColorPalette: defaultConfig.enableColorPalette,
    initKeywords: defaultConfig.initKeywords,
    highlightClass: MultiKeywordsHighlighterConstants.HIGHLIGHT_CLASS
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
          useValue: mockConfig
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
    mService = TestBed.inject(MultiKeywordsHighlighterService);

    triggerButton = await loader.getHarness(MatButtonHarness);
    mkhMenu = await loader.getHarness(MatMenuHarness);

    component = fixture.componentInstance;

    spyOn(component.keywordListOutput, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have theme color configuration and custom configuration', () => {
    expect(component.themeColor).toBe(mockConfig.themeColor as MATERIAL_COLOR);
    expect(component.config.highlightClass).toBe(MultiKeywordsHighlighterConstants.HIGHLIGHT_CLASS);
  });

  it('should have correct keyword number', () => {
    expect(component.keywordQuantity).toBe(0);
    component.addKeyword({
      input: null,
      value: 'Unit test'
    } as unknown as MatChipInputEvent);
    expect(component.keywordQuantity).toBe(1);
    const keywordCountElement = fixture.debugElement.query(By.css('#mh-keyword-count'));
    fixture.detectChanges();
    const keywordCount = keywordCountElement.nativeElement.textContent as string;
    expect(parseInt(keywordCount, 10)).toEqual(1);
  });

  it('should click MKH button, show the MKH menu', async () => {
    triggerButton = await loader.getHarness(MatButtonHarness);
    await triggerButton.click();
    fixture.whenStable();
    expect(mkhMenu.isOpen()).toBeTruthy();
  });

  it('should open the menu', async () => {
    const openMenuSpy = spyOn(MultiKeywordsHighlighterComponent.prototype as any, 'onOpened');
    openMenuSpy.and.callThrough();

    triggerButton = await loader.getHarness(MatButtonHarness);
    await triggerButton.click();
    expect(mkhMenu.isOpen()).toBeTruthy();
    expect(openMenuSpy).toHaveBeenCalled();
  });

  it('should close the menu', async () => {
    const closeMenuSpy = spyOn(MultiKeywordsHighlighterComponent.prototype as any, 'onClosed');
    closeMenuSpy.and.callThrough();

    triggerButton = await loader.getHarness(MatButtonHarness);
    await triggerButton.click();
    await mkhMenu.close();
    expect(closeMenuSpy).toHaveBeenCalled();
  });

  it('should toggle theme color', async () => {

    const toggleThemeColorSpy = spyOn(MultiKeywordsHighlighterComponent.prototype as any, 'onToggle');
    toggleThemeColorSpy.and.callThrough();

    component.onToggle({
      checked: true,
    } as unknown as MatSlideToggleChange);
    fixture.detectChanges();
    expect(toggleThemeColorSpy).toHaveBeenCalled();
    expect(component.themeColor).toBe(MATERIAL_COLOR.ACCENT);

    component.onToggle({
      checked: false,
    } as unknown as MatSlideToggleChange);
    fixture.detectChanges();
    expect(toggleThemeColorSpy).toHaveBeenCalled();
    expect(component.themeColor).toBe(MATERIAL_COLOR.PRIMARY);
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

    mService.localKeywords$.subscribe(kws => {
      kws.forEach((kw, index) => {
        expect(kws[index].name).toEqual(mockKeyword[index].name);
      });
    }).unsubscribe();
  });

  it('should remove keywords to the keyword list', async () => {
    triggerButton = await loader.getHarness(MatButtonHarness);
    await triggerButton.click();
    fixture.whenStable();

    keywordChipInput = await mkhMenu.getHarness(MatChipInputHarness);
    await keywordChipInput.focus();

    await keywordChipInput.setValue(mockKeyword[0].name);
    expect(await keywordChipInput.getValue()).toContain(mockKeyword[0].name);
    await keywordChipInput.blur();

    keywordChipList = await mkhMenu.getHarness(MatChipListHarness);
    expect((await keywordChipList.getChips({ text: mockKeyword[0].name })).length).toEqual(1);

    const deleteChip = await keywordChipList.getChips({ text: mockKeyword[0].name });
    await deleteChip[0].remove();
    expect((await keywordChipList.getChips({ text: mockKeyword[0].name })).length).toEqual(0);
    fixture.detectChanges();

    mService.localKeywords$.subscribe(kws => {
      expect(kws.length).toEqual(0);
    }).unsubscribe();
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
});
