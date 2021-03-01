# NG Multi Keywords Highlighter Workspace

![main](https://img.shields.io/travis/dylannnn/ng-multi-keywords-highlighter-workspace/main?label=main&logo=github) ![master](https://img.shields.io/travis/dylannnn/ng-multi-keywords-highlighter-workspace/master?label=master&logo=github) ![CircleCI](https://img.shields.io/circleci/build/github/dylannnn/ng-multi-keywords-highlighter-workspace?logo=circleci)
[![version](https://img.shields.io/badge/version-0.0.3-green.svg?style=flat)](https://www.npmjs.com/package/@amfrontender/ng-multi-keywords-highlighter-workspace) [![Angular](https://img.shields.io/badge/11.2.1-dd0031.svg?style=flat&logo=angular)](https://angular.io/) [![codecov master](https://codecov.io/gh/dylannnn/ng-multi-keywords-highlighter-workspace/branch/master/graph/badge.svg?token=NDWCLR55Y7)](https://codecov.io/gh/dylannnn/multi-keywords-highlighter-workspace) [![codecov main](https://codecov.io/gh/dylannnn/ng-multi-keywords-highlighter-workspace/branch/main/graph/badge.svg?token=NDWCLR55Y7)](https://codecov.io/gh/dylannnn/ng-multi-keywords-highlighter-workspace) ![npm](https://img.shields.io/npm/dm/@amfrontender/ng-multi-keywords-highlighter-workspace?logo=npm) ![GitHub](https://img.shields.io/github/license/dylannnn/ng-multi-keywords-highlighter-workspace) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/dylannnn/ng-multi-keywords-highlighter-workspace) ![GitHub package.json version](https://img.shields.io/github/package-json/v/dylannnn/ng-multi-keywords-highlighter-workspace) ![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/dylannnn/ng-multi-keywords-highlighter-workspace) [![Known Vulnerabilities](https://snyk.io/test/github/dylannnn/ng-multi-keywords-highlighter-workspace/badge.svg?targetFile=projects/ng-multi-keywords-highlighter/package.json)](https://snyk.io/test/github/dylannnn/ng-multi-keywords-highlighter-workspace?targetFile=projects/multi-keywords-highlighter/package.json)

NG Multi Keywords Highlighter is an Angular library that build together with Angular material.

It's create a fun way for searching an Angular web page for the interesting bits by input a keyword or a keyword list. This library could be assistive for searching heavy data page [ At least for me :) ].

Once you have input the keyword list, Multi Keywords Highlighter shows them to you instantly through beautiful and colorful highlighters (you could also customize the color palette). In addition, is also able to point out to you the number of matches on the current web page.

We all concern about our privacy or anonymity, the keywords are stored locally so you shouldn't worry it.

An authentication feature will be developed in a later stage to store encrypted keywords in the cloud if you agree with it, only you can access to it.

## How to use


### Install Required Peer Dependencies

`npm install @angular/material @angular/cdk @angular/flex-layout @amfrontender/ng-multi-keywords-highlighter-workspace`

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
import { MATERIAL_COLOR, MultiKeywordsHighlighterModule } from 'ng-multi-keywords-highlighter';
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
