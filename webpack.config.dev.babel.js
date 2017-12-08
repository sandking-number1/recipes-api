import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'src/index.html',
  filename: 'index.html',
  inject: true
});

export default {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: './src',
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  entry: [
    'webpack-hot-middleware/client?reload=true',
    PATHS.app
  ],
  target: 'web',
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // Create HTML file that includes reference to bundled JS.
    HTMLWebpackPluginConfig
  ]
}
