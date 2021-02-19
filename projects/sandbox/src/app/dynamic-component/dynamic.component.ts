import { Component, OnInit } from '@angular/core';
import { IKeyword } from 'multi-keywords-highlighter';
import { Info } from '../models/info.class';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  constructor(public info: Info) {}

  ngOnInit(): void {
  }

  onKeywordListOutput(emitEvent: IKeyword[]): void {
    console.log('[Dynamic] ON keywordListOutput: ', emitEvent);
  }
}
