import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiKeywordsHighlighterComponent } from './multi-keywords-highlighter.component';

describe('MultiKeywordsHighlighterComponent', () => {
  let component: MultiKeywordsHighlighterComponent;
  let fixture: ComponentFixture<MultiKeywordsHighlighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiKeywordsHighlighterComponent ]
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
