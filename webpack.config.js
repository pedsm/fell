var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/less/fell.less'), 'utf8'));

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.js?/,
                include : APP_DIR,
                loader : 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" }, 
                    { loader: "css-loader" }, 
                    { loader: "less-loader", 
                        options: {
                            modifyVars: themeVariables,
                            root: path.resolve(__dirname, './')
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;
