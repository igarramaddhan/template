import {Request, Response} from 'express';
import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server';
import App from '../app/App';

enum ErrorCode {
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

const serverRenderer =
  (manifest: Object = {}) =>
  async (req: Request, res: Response) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log('fullUrl: ', fullUrl);
    console.log('req.url: ', req.url);

    const app = (
      <StrictMode>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </StrictMode>
    );

    const statusCode = 200;
    let content = '';

    try {
      console.log('>>', 'rendering page');
      content = renderToString(app);
    } catch (error) {
      console.error('>>', error);
      content = JSON.stringify(error);
    }

    // const mapToScripts = (manifest: Object = {}) =>
    //   Object.keys(manifest).map((key) => {
    //     const src = manifest[key as keyof typeof manifest];
    //     return `<script src="${src}" async></script>`;
    //   });
    // const mainScript = mapToScripts(manifest).join('');

    const mainScript =
      manifest && manifest['main.js' as keyof typeof manifest]
        ? `<script src=".${
            manifest['main.js' as keyof typeof manifest]
          }" defer></script>`
        : '';

    const html = `
      <!doctype html>
      <html lang="en">
        <head>
          <title>Experiment SSR</title>
        </head>

        <body>
          <div id="root">${content}</div>
          ${mainScript} 
        </body>
      </html>
      `;

    return res.status(statusCode).send(html);
  };

export default serverRenderer;
