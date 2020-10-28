import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
if (process.env.PRODUCTION) {
  mongoose.connect(process.env.MONGO_URL, {
    auth: {
      user: process.env.MONGO_ADMIN_USER,
      password: process.env.MONGO_ADMIN_PASS,
    },
    useNewUrlParser: true,
    useFindAndModify: false,
  });
} else {
  mongoose.connect(process.env.MONGO_DEV_URL, {
    auth: {
      user: process.env.MONGO_DEV_ADMIN_USER,
      password: process.env.MONGO_DEV_ADMIN_PASS,
    },
    useNewUrlParser: true,
    useFindAndModify: false,
  });
}
const db = mongoose.connection;

const handleOpen = () => console.log('⭕ Connected to DB');
const handleError = (error) => console.log(`❌ Error on DB Connection: ${error}`);

db.once('open', handleOpen);
db.on('error', handleError);
