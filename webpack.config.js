const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// const tailwindcss = require('tailwindcss')
// const autoprefixer = require('autoprefixer')
// const postcssImport = require('postcss-import')

const webpackConfig = (env, { mode = 'development' }) => {
  const isDev = mode === 'development'
  const config = {
    mode,
    entry: {
      polyfill: '@babel/polyfill',
      app: path.resolve(__dirname, 'src/index.jsx'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[fullhash].js',
      publicPath: '/',
    },
    target: isDev ? 'web' : 'browserslist',
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        Assets: path.resolve(__dirname, 'src/_assets'),
        Templates: path.resolve(__dirname, 'src/_components'),
      },
    },
    optimization: {
      splitChunks: { chunks: 'all' },
      mangleWasmImports: true,
      mergeDuplicateChunks: true,
      removeEmptyChunks: true,
      minimize: !isDev,
      nodeEnv: mode,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(s[ac]ss|css)$/,
          // exclude: /node_modules/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', // Parse the css into js
              options: { sourceMap: isDev },
            },
            // {
            //   loader: 'postcss-loader',
            // },
            {
              loader: 'sass-loader', // Convert Scss/sass to css
              options: { sourceMap: isDev },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            'babel-loader',
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true, // true outputs JSX tags
                outputPath: 'images',
                name: () => (isDev ? '[path][name].[ext]' : '[contenthash].[ext]'),
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          include: path.resolve(__dirname, 'src/_assets'),
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: () => (isDev ? '[path][name].[ext]' : '[contenthash].[ext]'),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment/),
      // use 'development' unless process.env.NODE_ENV is defined
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: path.resolve(__dirname, 'dist/index.html'),
        favicon: path.resolve(__dirname, 'public/lykafe.png'),
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[fullhash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[fullhash].css',
      }),
      new CleanWebpackPlugin(),
    ],
  }

  if (isDev) {
    config.devtool = 'inline-source-map'
    config.watchOptions = {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    }
    config.plugins = [...config.plugins, new webpack.ProgressPlugin(), new webpack.HotModuleReplacementPlugin()]
    config.devServer = {
      clientLogLevel: 'silent',
      contentBase: path.resolve(__dirname, 'src'),
      hot: true,
      open: true,
      port: 9000,
      compress: true,
      publicPath: '/',
      watchContentBase: true,
      historyApiFallback: true,
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: false,
        entrypoints: false,
      },
    }
  } else {
    config.plugins = [
      ...config.plugins,
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(css|js|html|svg)$/,
        threshold: 10240,
        minRatio: 0.4,
      }),
    ]
  }
  return config
}

module.exports = webpackConfig
