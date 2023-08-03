import mongoose from 'mongoose';
import config from './config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Successfully Connected!');

    app.listen(config.port, () => {
      console.log('Server is running on port ', config.port);
    });
  } catch (err) {
    console.error('Failed to connect!', err);
  }
}

main();
