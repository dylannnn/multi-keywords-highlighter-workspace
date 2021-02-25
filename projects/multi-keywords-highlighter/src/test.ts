// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/**
 * @ignore
 */
declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

/**
 * @ignore
 */
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

/**
 * @ignore
 */
const materialIcons = document.createElement('link');
materialIcons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
materialIcons.rel = 'stylesheet';
materialIcons.id = 'material-icons';
document.head.appendChild(materialIcons);

/**
 * @ignore
 */
const materialFonts = document.createElement('link');
materialFonts.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap';
materialFonts.rel = 'stylesheet';
materialFonts.id = 'material-fonts';
document.head.appendChild(materialFonts);
