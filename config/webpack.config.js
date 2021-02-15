const paths = require('./paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const autoprefixer = require('autoprefixer')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const BrotliPlugin = require('brotli-webpack-plugin')

const IS_DEV = process.env.NODE_ENV !== 'production'
const targets = IS_DEV ? { chrome: '79', firefox: '72' } : '> 0.25%, not dead'

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'inline-source-map' : false,
  entry: {
    main: [paths.src + '/index.tsx']
  },
  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash].bundle.js',
    chunkFilename: 'js/[name].[contenthash].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()]
  },
  optimization: {
    minimize: !IS_DEV,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, paths.nodeModulesPath],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', { modules: false, targets }], '@babel/react', '@babel/typescript'],
            plugins: [
              '@babel/proposal-numeric-separator',
              '@babel/plugin-transform-runtime',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-object-rest-spread'
            ]
          }
        }
      },
      {
        test: /\.(s[ac]ss|css)$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          {
            loader: IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: '[local]'
              },
              sourceMap: IS_DEV
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: IS_DEV,
              postcssOptions: {
                plugins: IS_DEV ? [autoprefixer()] : []
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: !IS_DEV
            }
          }
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: paths.root + '/public' }]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? 'styles/[name].css' : 'styles/[name].[fullhash].css',
      chunkFilename: IS_DEV ? '[id].css' : '[id].[hash].css'
    }),
    IS_DEV && new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Github profiler',
      template: paths.root + '/public/index.html',
      filename: 'index.html',
      inject: 'body',
      publicPath: '/'
    }),
    IS_DEV && new BundleAnalyzerPlugin(),
    !IS_DEV &&
      new BrotliPlugin({
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
      }),
    new Dotenv({
      path: paths.root + '/.env.example',
      safe: true,
      silent: true
    })
  ].filter(Boolean),
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: IS_DEV,
    compress: true,
    hot: IS_DEV,
    publicPath: '/',
    stats: 'errors-only',
    overlay: IS_DEV,
    port: 8080
  }
}
