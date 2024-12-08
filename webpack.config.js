const pkg = require('./package.json');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  entry: ['./src/index.scss', './src/index.ts'],
  output: {
    path: path.join(__dirname, 'target'),
    filename: 'index.[contenthash].js',
    clean: true
  },
  devtool: production ? false : 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/assets')
    },
    hot: false,
    host: '0.0.0.0',
    port: 8081
  },
  watch: true,
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'sass-loader'
          {
            loader: 'sass-loader',
            options: {
              api: 'modern',
              sassOptions: {
                // Your sass options
              },
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets/**/*',
          // context: '',
          // noErrorOnMissing: true
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: `./src/index.html`,
      // inject: 'body',
      title: pkg.name,
      // templateParameters: { cte },
      minify: production,
      // favicon: `${main}/libs/bootstrap/favicon.png`
    })
  ],
  optimization: {
    minimize: production,
    minimizer: [new TerserWebpackPlugin({
      extractComments: production,
      terserOptions: {
        /* @see https://github.com/terser/terser#minify-options */
        keep_classnames: true
      }
    })]
  }
};
