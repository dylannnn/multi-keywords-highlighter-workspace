#!/bin/bash
git pull

echo update changelog
cd ./src/multi-keywords-highlighter/
node ../../node_modules/standard-version/bin/cli.js --infile ../../CHANGELOG.md
cd ../..

echo build lib
npm run build:lib

echo push tags
git push --follow-tags origin main

echo push to npm
cp README.md ./dist/multi-keywords-highlighter/
cd ./dist/multi-keywords-highlighter/
npm publish --access=public
