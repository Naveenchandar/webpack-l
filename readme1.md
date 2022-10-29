# Webpack -> Bundling and minifies the entire files into single file and manages dependencies.

## Packages to install -> `npm i webpack webpack-cli --save-dev`

After installing, change the script to webpack for either build or start in package.json file.

For example: 
If I'm changing in start script. After running command `npm start`, If you look the project folder, inside main directory, folder named 'dist' will be created and inside that file named 'index.js' is created. This index.js file contains all the informations.


## How webpack minifies ?

It minifies based on the imports.
In src/index.js file
Line no.1  i have imported 'app' from another file named 'app.js'. It will redirect through app.js file and will look for any import is present. If there's no import, it will minify all the code contained in 'app.js' file and will return back to 'src/index.js' file and bundle and minify the remaining code in 'index.js' file.


## Configuration

* By default webpack will create folder named **dist**. 
* But it can be configured. First create a file **webpack.config.js** (file name is just a naming convention followed but it can be any name) inside main directory. 
* The result is single object. We need to export it. Object contains lot of properties. 
* One such property is **output** which is also an object with properties (filename,path). we need to assign values for both filename and path inorder to change output folder and file name.
* After declaring it, inside package.json file in scripts where we have mentioned 'webpack', change that to **webpack --config {filename}**. In my case, it will be 'webpack --config --webpack.config.js'.

## Mode

* Property named **mode** is available with two values **development**, **production**. By default it will be **production**. If its in production mode, everything will be minified and bundled inside dist/index.js file.
* If we set **mode:'development'**, inside dist/index.js file, will get unminified and able to see how webpack has bundled all the files.

## Configure loaders

* Loaders are used to process other types of files i.e,. other than javascript. For ex (Html, css, svg etc.).
* Set of rules can be declared for each loaders. Webpack bundles based on that.
* css-loader will convert css into js and insert into dist/index.js file. (until this point, css changes will not be reflected)
* style-loader will inject those styles using strict tag.

## Caching

* Another important feature of wepack is cache busting and plugins.
* For ex, when we try to do hard refresh github (shift + cmd + R), and check the network tab everything loaded from the server.
* Once loaded, when we try refresh, it will not fetch the details from server instead browser will cache it and load them. It makes faster load.
* This cache is done using caching. When content is changed browser will request it from the server otherwise it will load from the cache.
* If we check the file name it will be github.com-[string].css. string contains radonm alphanumeric characters. This is called **content hashing**.
* When something in file is getting changed, file remains same, but if its different then file gets changed and new string will be generated.
* This can be acheived by changing the **filename** property in **output** object.
* Instead of giving filename, we need to provide as **main.[contenthasgh].js**
* Once done npm start or npm build (wherever webpack has been given in script inside package.json file), it will create a file name with main.[alphanumeric].js. By generating this file, It has ability to load from cache and not to request same content to browser.

## Plugins

* If scripts file are generated differently with different hash characters each time, how we can import particular script files in our static index.html file ?. Solution is Plugins. Plugins generated HTML bundles with generated hash script file for us or we can generate our own template using lodash.
* `npm i --save-dev html-webpack-plugin`
* After installing, import it in the webpack config file.
* Property available in the webpack config called **plugins** Which includes value array. We need to declare it in. `plugins: [new HtmlWebpackPlugin()]`.
* Once done, if we do npm start or npm build (wherever webpack has been given in script inside package.json file), webpack will generate a html file for us inside dist folder with named index.html.
* It has correct script included.
* But html content is not be loaded yet.
* Inorder to load html content, we need to provide html template for webpack.
* create a file named **template.html** inside src folder. After that add property named template inside plugins property in webpack config file. 
```
plugins: [new HtmlWebpackPlugin({
            template: './src/template.html'
         })]
```
* Once done, try restarting the application. Webpack will take the provided html file and will include script tags for us.


## Splitting Environments

- We can split webpack configuration based on different environments.
- Create two different files such as webpack.prod.js and webpack.dev.js (Its just a naming convention. It can be any name).
- There will be one common config file (webpack.config.js).
- This common config file will have all the common properties across different environments.
- we use package named `wepack-merge` inorder to merge common changes and specific environment changes.
- import it and merge common changes with environment files. Example given below.
```
const commonConfig = require('./webpack.config');
const { merge } = require('webpack-merge');
module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    }
});
```
- Once all the above changes done, in package.json file, change the script command in order to support two different environments.
```
"start": "webpack --config webpack.config.dev.js", // development (npm start)
"build": "webpack --config webpack.config.prod.js" // production (npm run build)
```
- Right now whenever we're doing changes while developing, we need to refresh inorder to check for the changes. To avoid that, we can use webpack-dev-server. Webpack server will automatically fetches the changes and reloads it. 
**NOTE: webpack-dev-server will stores everything in memory and reloads it. So we don't want to manually delete the dist folder for each and every change.**
- ``npm i --save-dev webpack-dev-server``
- after installing the above package, change the start script command in package.json file.
```
"start": "webpack-dev-server --config webpack.config.dev.js --open", // --open command is to open it in browser
```

## HTML-Loader & File-Loader
- If we are using local assets (svg,png etc). we are hard coding the exact location of the particular file. But webpack will look for changes in dist folder and we will not have any local file location related to that.
- To handle html files and location we can use ``html-loader`` and to handle files like (images and svg's) we can use ``file-loader``.
- If we need to create separate images or assets folder inside dist folder, use `assetModuleFilename: 'images/[name].[ext]'` this property inside output object.
- This property will create a separate folder names **images** in dist folder. Inside images folder will have image name with extension.
- [name].[ext] is dynamic images file name with extension.
- If needed to create a hash image name, it can be created too. `[name].[contenthash].[ext]`.


## clean webpack
- Whenever we are adding/changing files, webpack will automatically generate new files while we run `npm start/npm run build`.
- While generating new files, webpack will not remove the old generated file. for example, if we are changing 6 different files with 6 different changes then webpack will generate 6 different files. Webpack will take the recent changed build file and will reflect the changes. But it will not remove the previous 5 changed files. It will be a cumbersome if multiple developers are working and if multiple files are changed. In order to avoid that, we can use `clean-webpack-plugin`.
- ``npm i --save-dev clean-webpack-plugin``.
- This plugin needs only in production, not in development. If needed in development, we can use it.

## Extract css file
- To extract css from html file we can use plugins.
- `npm i --save-dev mini-css-extract-plugin`
- Once done, add specific plugin into webpack production config file.
- This packages is not needed for development, because for each and every change it will extract css into separate file. While extracting it will take some time. 
```
new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
})
```

## Minify JS
- To minify javascript files, you don't want to install separate npm package.
- While installing webpack the package will be installed by default.
- The package is `terser-webpack-plugin`.