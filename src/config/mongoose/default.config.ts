export default {
  id: 'tsed-mongo-sdk',
  url: process.env.MONGO_URI || 'mongodb://mongo:27017/tsed-mongo-sdk',
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
