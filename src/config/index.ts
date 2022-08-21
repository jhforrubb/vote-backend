const config = {
  mongoDB: {
    host: process.env.MONGODB_HOST || 'localhost',
    port: parseInt(process.env.MONGODB_PORT, 10) || '27017',
    dbName: process.env.MONGODB_DB_NAME || 'admin',
    username: process.env.MONGODB_USERNAME || 'vote',
    password: process.env.MONGODB_PASSWORD || 'vote123',
  },
};

export default config;
