import dotenv from 'dotenv';

dotenv.config();

interface IdbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

const dbConfig: IdbConfig = {
  host: process.env.DATABASE_HOST || '',
  user: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || '',
};

export default dbConfig;
