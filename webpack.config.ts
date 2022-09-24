import path from 'path';
import {WebpackManifestPlugin} from 'webpack-manifest-plugin';
import {Configuration, HotModuleReplacementPlugin} from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const main = !isProduction
  ? [
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      path.resolve(__dirname, './src/app/index.tsx'),
    ]
  : [path.resolve(__dirname, './src/app/index.tsx')];

const jsPlugins = !isProduction ? ['react-refresh/babel'] : [];

const sharedPlugins = [
  new WebpackManifestPlugin({
    publicPath: '/',
    fileName: 'manifest.json',
    writeToFileEmit: true,
  }),
];

const plugins = !isProduction
  ? [
      ...sharedPlugins,
      new HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        overlay: {
          sockIntegration: 'whm',
        },
      }),
    ]
  : sharedPlugins;

const webpackConfig: Configuration = {
  target: 'web',
  mode: !isProduction ? 'development' : 'production',
  entry: {main},
  devtool: !isProduction ? 'inline-source-map' : 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `[name].js`,
    chunkFilename: `[name].chunk.js`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  // optimization: {
  //   runtimeChunk: 'single',
  // },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, 'src/app')],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: jsPlugins,
          },
        },
      },
    ],
  },
  plugins,
};

export default webpackConfig;
