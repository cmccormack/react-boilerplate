# react-boilerplate
Boilerplate for React app

## To Install:

1. Clone repository
  * `git clone https://github.com/cmccormack/react-boilerplate.git`
2. Enter repository directory
  * `cd react-boilerplate`
3. Install dependencies
  * `npm install`
4. Test success by running in development server
  * `npm run dev:start`
    * A new browser tab should open `http://localhost:9000/`
    * A success message should be displayed in the browser tab

## NPM Scripts:
  * `build`
    * Outputs bundle and assets to "/dist" directory in "production" mode
  * `build:local`
    * Same as `build` but sets webpack's `output.publicPath` to a relative path to enable testing on localhost
  * `build:vis`
    * Same as `build` but enables webpack-bundle-analyzer to analyze bundle module size
  * `build:local:vis`
    * Same as `build:local` but enables webpack-bundle-analyzer to analyze bundle module size
  * `dev:build`
    * Outputs bundle and assets to "/dist" directory in "development" mode
  * `dev:build:vis`
    * Same as `dev:build` but enables webpack-bundle-analyzer to analyze bundle module size
  * `dev:start`
    * Starts a development server that performs live reload when a file is saved
  * `dev:start:vis`
    * Same as `dev:start` but enables webpack-bundle-analyzer to analyze bundle module size
  * `setup`
    * Runs setup ** Currently in development **

## Issues:
  * On Windows, there may be an issue with `node-sass` where bindings may not be found for the current environment
    * Known fix - Uninstall and reinstall `node-sass`
      ```sh
      npm uninstall -D node-sass
      npm install -D node-sass
      ```
