const path = require('path')
const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'WebTorrentPlayer',
    sourceMapFilename: 'bundle.js.map'
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process-fast'
    }),
    new NodePolyfillPlugin()
  ]
}
