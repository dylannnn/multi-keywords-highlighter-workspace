import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { MultiKeywordsHighlighterComponent } from 'ng-multi-keywords-highlighter';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full'
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  // Demo for lazyloading library
  {
    path: 'lib-experimental',
    // loadChildren: () => import('multi-keywords-highlighter').then(m => m.MultiKeywordsHighlighterModule),
    outlet: 'multi-keywords-highlighter',
    component: MultiKeywordsHighlighterComponent
  },
  {
    path: '**',
    redirectTo: 'demo'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
