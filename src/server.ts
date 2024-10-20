/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Server } from 'http'
import app from './app'
import config from './config/index'


let server: Server;

async function bootstrap() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    console.error('Failed to connect database', err)
  }

}

bootstrap()

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejectin is deleted, shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaughtException is detected, shutting down...");

  process.exit(1);
})