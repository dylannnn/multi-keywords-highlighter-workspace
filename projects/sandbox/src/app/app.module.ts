import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MATERIAL_COLOR, MultiKeywordsHighlighterModule } from 'multi-keywords-highlighter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MultiKeywordsHighlighterModule.forRoot({
      themeColor: MATERIAL_COLOR.PRIMARY
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
