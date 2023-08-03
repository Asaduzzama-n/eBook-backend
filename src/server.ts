import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { logger } from './shared/logger';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Successfully Connected!');

    app.listen(config.port, () => {
      logger.info('Server is running on port ', config.port);
    });
  } catch (err) {
    logger.error('Failed to connect!', err);
  }
}

main();
