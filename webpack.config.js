const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './client/src/index.js', 
    output: {
        path: path.resolve(__dirname, 'client/src'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['@babel/preset-env'] 
                    }
                }
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] 
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/src/index.html' 
        }),
        new WorkboxPlugin.GenerateSW({

            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
};
