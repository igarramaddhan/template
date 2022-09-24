import {Express} from 'express';

function runHttpServer(app: Express) {
  console.log('>>', 'runHttpServer');
  const PORT = Number(process.env.PORT || 3000);
  const server = app.listen(PORT, () => {
    console.info(`App server is listening PORT: ${PORT}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    switch (err.code) {
      case 'EACCES':
        console.error('Not enough privileges to run app server.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${PORT} is already in use.`);
        process.exit(1);
        break;
      default:
        console.error(err.message);
        throw err;
    }
  });

  // handle server shutdown, gracefully
  const serverCloseHandler = (exitCode: number) => () => {
    server.close(() => {
      process.exit(exitCode);
    });
  };

  ['uncaughtException', 'unhandledRejection'].forEach((event) => {
    process.on(event, (err: Error) => {
      serverCloseHandler(1);
    });
  });

  ['SIGINT', 'SIGTERM', 'SIGHUP'].forEach((signal) => {
    process.on(signal, serverCloseHandler(0));
  });
}

export default runHttpServer;
