import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_key: process.env.CLOUDINARY_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,

  firebase_api_key: process.env.FIREBASE_API_KEY,
  firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
  firebase_project_id: process.env.FIREBASE_PROJECT_ID,
  firebase_storage_bucket: process.env.FIREBASE_STORAGE_BUCKET,
  firebase_messaging_id: process.env.FIREBASE_MESSAGING_ID,
  firebase_app_id: process.env.FIREBASE_APP_ID,
  firebase_measurement_id: process.env.FIREBASE_MEASUREMENT_ID,

  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
