import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { IKeyword } from 'multi-keywords-highlighter';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  initHighlighter = false;
  showHighlighter = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // console.log('Router ', this.router);
    // console.log('Activated route: ', this.activatedRoute.snapshot);
    this.activatedRoute.data.subscribe(data => {
      console.log('Activated Route Data: ', data);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      console.log('Init Activated Route Data: ', data);
    });
    const children = this.activatedRoute.children;
    children.forEach(child => {
      console.log('Init ', child.outlet);
      if (child.outlet !== 'primary') {
        this.router.navigate([{ outlets: { 'multi-keywords-highlighter': null }}]);
      }
    });
  }

  // ngAfterContentChecked(): void {
  //   const children = this.activatedRoute.children;
  //   children.forEach(child => {
  //     console.log('After ngAfterContentChecked :', child.outlet);
  //     if (child.outlet !== 'primary' && !this.initHighlighter) {
  //       this.router.navigate([{ outlets: { 'multi-keywords-highlighter': null }}]);
  //     }
  //   });
  // }

  onKeywordListOutput(emitEvent: IKeyword[]): void {
    console.log('[DEMO] ON keywordListOutput: ', emitEvent);
  }

  toggleLib(): void {
    this.showHighlighter = !this.showHighlighter;
    console.log('[DEMO] this.showHighlighter', this.showHighlighter);
    // console.log(' this.router: ',  this.activatedRoute.children);
    if (!this.showHighlighter) {
      this.router.navigate([{ outlets: { 'multi-keywords-highlighter': null }}]);
    }
  }
}
