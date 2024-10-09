import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database Successfully Connected!`);

    server = app.listen(config.port, () => {
      console.log('Server is running on port ', config.port);
    });
  } catch (err) {
    console.log('Failed to connect!', err);
  }

  process.on('unhandledRejection', error => {
    console.log(
      '🚨 Unhandled Rejection is detected, we are closing the server! 🚨',
    );
    if (server) {
      server.close(() => {
        console.log(`Failed to connect!`, error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();
