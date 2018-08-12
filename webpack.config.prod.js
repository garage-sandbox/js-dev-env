import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'distr'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Generate an exteral css file with a hash in filename
    new ExtractTextPlugin('[name].[contenthash].css'),
    //hash the files using MD5 so their names chg when content chg
     new WebpackMd5Hash(),
    //To create separate bundle for vendor libraries
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),    
    //Create html file that includes ref to bundled JS
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true,
        trackJSToken: '16687ad03da349c0a7bdffef26f3a9c7',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
    }),
    //Eliminate dup packages when gen bundle
    new webpack.optimize.DedupePlugin(),
    //Minify JS  
    new webpack.optimize.UglifyJsPlugin()  
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      //{test: /\.css$/, loaders: ['style', 'css']}
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}