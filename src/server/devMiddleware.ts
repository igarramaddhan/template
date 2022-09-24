import path from 'path';
import webpack from 'webpack';
import {Express} from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../../webpack.config';

const isDev = process.env.NODE_ENV !== 'production';

const compiler = webpack(config);
const dirName = path.resolve(__dirname, '../app/');

if (isDev) {
  compiler.hooks.afterEmit.tap('cleanup-the-require-cache', () => {
    // After webpack rebuild, clear the files from the require cache,
    // so that next server side render wil be in sync
    Object.keys(require.cache)
      .filter((key) => key.includes(dirName))
      .forEach((key) => delete require.cache[key]);
  });
}

const runDevServer = (callback = (manifest: Object = {}) => {}) => {
  if (isDev) {
    const webpackDevInstance = webpackDevMiddleware(compiler, {
      serverSideRender: true,
      writeToDisk: false,
      publicPath: config.output?.publicPath || '/',
      headers: {'Access-Control-Allow-Origin': '*'},
      stats: 'minimal',
    });

    webpackDevInstance.waitUntilValid(() => {
      const manifest = JSON.parse(
        // @ts-ignore
        compiler.outputFileSystem.readFileSync(
          path.join(__dirname, '../../dist', 'manifest.json'),
          'utf8'
        )
      );
      console.log('>>', 'dev', manifest);
      callback(manifest);
    });

    const hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      path: '/__webpack_hmr',
      heartbeat: 2000,
    });
    return [webpackDevInstance, hotMiddleware];
  }
  callback();
  return [];
};

export default runDevServer;
