# Phaser 3 with TypeScript

Some simple apps to learn more about Phaser 3.

## Development

If you want to develop the project further, the following commands should be sufficient:

```powershell
git clone https://github.com/Mizar999/just-phaser.git
npm install
```

## New Phaser project - Setup

- Init npm and install necessary packages

    ```powershell
    npm init -y
    npm install --save-dev typescript@4.6.4 ts-loader@9.3.0 webpack@5.72.1 webpack-cli@4.9.2 phaser@3.55.2 http-server@14.1.0 concurrently@7.2.1
    ```
- Create **Webpack** configuration `webpack.config.js`:

    ```javascript
    const path = require('path');

    module.exports = {
    entry: './src/app.ts',
    module: {
        rules:[{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
    };
    ```

- Webpack will get the sources from `src/app.ts` and collect everything in `dist/app.js` file
- Create **TypeScript** configuration `tsconfig.json`:

    ```json
    {
        "compilerOptions": {
            "target": "es5"
        },
        "include": [
            "src/*"
        ]
    }
    ```

- Download the [Phaser 3 definitions](https://github.com/photonstorm/phaser/tree/master/types) into the `types` subdirectory (`types/phaser.d.ts`)
- Update the **scripts**-section of the `package.json` file, add build and watch scripts for each app separately:

    ```json
    "scripts": {
        "build": "webpack",
        "watch": "webpack --watch",
        "serve": "http-server --port=8085 -c-1"
    }
    ```

- To build the application run:

    ```powershell
    npm run-script build
    ```

- To run multiple npm scripts cross platform in parallel run the following command (use the appropriate watch command for the app you want to run):

    ```powershell
    # if globally installed
    concurrently npm:watch npm:serve

    # if locally installed
    npx concurrently npm:watch npm:serve
    ```