import 'isomorphic-fetch';
import path from 'path';
import express from 'express';
import runHttpServer from './runHttpServer';
import runDevServer from './devMiddleware';
import serverRenderer from './serverRenderer';
import compression from 'compression';

const isDev = process.env.NODE_ENV !== 'production';

const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, '../../dist'), {index: false}));
app.use(express.json());
app.use(express.urlencoded());

app.use('/public', express.static('public'));
app.use(express.static(path.resolve(process.cwd(), 'public')));

function renderServer(manifest: Object = {}) {
  const routes = express.Router();

  routes.get('*', serverRenderer(manifest));
  return routes;
}

function initServer(manifest: Object | undefined = {}) {
  console.log('>>', 'INIT SERVER');
  app.use('/', renderServer(manifest));

  app.use((req: express.Request, res: express.Response) =>
    res.send('errors/404')
  );
}

if (isDev) {
  app.use(
    runDevServer((manifest) => {
      initServer(manifest);
      runHttpServer(app);
    })
  );
} else {
  const manifest = require('../../dist/manifest.json');
  initServer(manifest);
  runHttpServer(app);
}
