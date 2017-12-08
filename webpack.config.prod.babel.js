import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
  app: path.join(__dirname, 'src/index'),
  vendor: path.join(__dirname, 'src/vendor'),
  build: path.join(__dirname, 'dist')
};

export default {
  devtool: 'cheap-module-source-map',
  entry: [
    PATHS.app,
    PATHS.vendor
  ],
  target: 'web',
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
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
      },
      inject: true
    }),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          }]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  }
};
