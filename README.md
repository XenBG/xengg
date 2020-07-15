## Installation
1. Install npm packages with ```npm install```.

## Compiling assets
1. Run ```./node_modules/.bin/gulp``` to compile all assets or use ```styles``` to compile a specific one.
2. Run ```./node_modules/.bin/gulp watch``` to watch all assets to compile or use ```watch-styles``` to watch a specific one.

## Cache busters
1. Run ```./node_modules/.bin/gulp cache-clear``` to clear everything. This will clear cache of imported assets (like CSS), and all the images found in the HTML files.
2. Run ```./node_modules/.bin/gulp cache-assets``` if you want to clear only the imported assets' cache (CSS).
3. Run ```./node_modules/.bin/gulp cache-html``` if you want to clear only the images' cache in the HTML files.
