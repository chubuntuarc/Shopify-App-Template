require("dotenv").config();
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

// Main settings for the next instance.
module.exports = withCSS({
    assetPrefix: process.env.BASE_PATH || '',
    publicRuntimeConfig: {
        basePath: process.env.BASE_PATH || '',
    },
    webpack: (config) => {
        const env = { API_KEY: apiKey };
        config.plugins.push(new webpack.DefinePlugin(env));
        return config;
    },
});