# Livree Custom Shoe Configurator

## Usage

### `npm run start`

### `npm run build`

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Environments

### NODE_ENV `development`

This will change the endpoints to load from port :3001, launch a WordPress instance of the Livree app on this port (ie: `http://localhost:3001`)

You will need to run Chrome with disabled security to disable CORS

`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

### STANDALONE `true`

This environment variable is set within Netlify and overrides the endpoints with static data instead
This also loads `https://jsonplaceholder.typicode.com/todos/100` to approximate load times in the Thunks
