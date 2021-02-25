## Welcome

Multi Keywords Highlighter is an Angular library that build together with Angular material.

It's create a fun way for searching an Angular web page for the interesting bits by input a keyword or a keyword list. This library could be assistive for searching heavy data page [ At least for me :) ].

Once you have input the keyword list, Multi Keywords Highlighter shows them to you instantly through beautiful and colorful highlighters (you could also customize the color palette). In addition, is also able to point out to you the number of matches on the current web page.

We all concern about our privacy or anonymity, the keywords are stored locally so you shouldn't worry it.

An authentication feature will be developed in a later stage to store encrypted keywords in the cloud if you agree with it, only you can access to it.


## How to use


### Install Required Peer Dependencies

`npm install @angular/material @angular/cdk @angular/flex-layout @amfrontender/multi-keywords-highlighter-workspace`

### Usage

Add below scss to your global scss file. You can customize Angular Material themes freely. View this link to [Defining a custom theme](https://material.angular.io/guide/theming#defining-a-custom-theme)

```scss
@import '~@angular/material/theming';

// Include non-theme styles for core.
@include mat-core();

// Define your application's custom theme.
$primary: mat-palette($mat-indigo);
$accent: mat-palette($mat-pink, A200, A100, A400);
$theme: mat-light-theme($primary, $accent);

// Include theme styles for Angular Material components.
@include angular-material-theme($theme);

html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }

```

Add below html to your index.html <head> tag.

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Import `MultiKeywordsHighlighterModule` to you `app.module.ts`

```typescript
import { MATERIAL_COLOR, MultiKeywordsHighlighterModule } from 'multi-keywords-highlighter';
...

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    MultiKeywordsHighlighterModule.forRoot({
      themeColor: MATERIAL_COLOR.PRIMARY
    })
    ...
  ],
  ...
```

## Roadmap

- [x] Search
- [x] Highlight
- [ ] Save to localstorage
- [ ] Themes
- [ ] CI/CD Release
- [x] Compodoc Documentation
- [ ] Storybook

## Issues?

If you have any issues, suggestions, welcome to create an issue in the Github. (Follow a standard guideline)

## Contribute

We like open source, so let's build it together.

## At the End
If you love it, you can [support me](https://www.buymeacoffee.com/yunfeili)!
