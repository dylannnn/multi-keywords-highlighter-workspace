# MultiKeywordsHighlighter

## Install Required Peer Dependencies

`npm install @angular/material @angular/cdk @angular/flex-layout`

## Usage

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
