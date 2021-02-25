import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { MATERIAL_COLOR, LABEL_POSITION, MultiKeywordsHighlighterModule } from 'multi-keywords-highlighter';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DynamicComponent } from './dynamic-component/dynamic.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DemoComponent,
    DynamicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MultiKeywordsHighlighterModule.forRoot({
      themeColor: MATERIAL_COLOR.PRIMARY,
      enableToggleLabel: true,
      toggleLabelPosition: LABEL_POSITION.BEFORE,
      enableHighlighterTooltip: 'Turn on/off highlighter',
      // linkToCopyright: false,
      minWidth: 320
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
