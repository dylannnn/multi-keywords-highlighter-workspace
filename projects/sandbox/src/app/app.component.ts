import { Component } from '@angular/core';
import { IKeyword } from 'multi-keywords-highlighter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sandbox';

  onKeywordListOutput(emitEvent: IKeyword[]) {
    console.log('[DEMO] ON keywordListOutput: ', emitEvent);
  }
}
