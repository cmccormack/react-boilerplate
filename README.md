# react-boilerplate
Boilerplate for React app

## To Install:

1. Clone repository
  * `git clone https://github.com/cmccormack/react-boilerplate.git`
2. Enter repository directory
  * `cd react-boilerplate`
3. Install dependencies
  * `npm install`
4. Test success by running in developer server
  * `npm run start:dev`
    * A new browser tab should open `http://localhost:9000/`
    * A success message should be displayed in the browser tab

## NPM Scripts:
  * `build`
    * Outputs bundle and assets to "/public" directory with "production" flag
  * `build:local`
    * Same as `build` but sets localPath to a relative directory to enable testing on localhost
  * `dev`
    * Outputs bundle and assets to "/public" directory with "development" flag
  * `dev:local`
    * Same as `dev` but sets localPath to a relative directory to enable testing on localhost
  * `start:dev`
    * Starts a development server that allows live reload when a file is saved
  * `start:visualize`
    * Same as `start:dev` and also shows a visual representation of module sizes

## Issues:
  * On Windows, there may be an issue with `node-sass` where bindings may not be found for the current environment
    * Known fix - Uninstall and reinstall `node-sass`
      ```sh
      npm uninstall -D node-sass
      npm install -D node-sass
      ```
