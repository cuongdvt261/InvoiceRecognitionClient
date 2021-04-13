const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    entry: './index.ts',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, './src/')
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'api.bundle.js'
    }
}