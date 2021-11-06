import { join } from 'path';
import { loggerConfig } from './logger';
import { isProduction } from './env';

const { version } = require('../../package.json');

export const rootDir = join(__dirname, '..');

export const config: Partial<TsED.Configuration> = {
  version,
  rootDir,
  logger: loggerConfig,
  mongoose: [{
    id: 'tsed-mongo-sdk',
    url: process.env.MONGO_URI || 'mongodb://mongo:27017/tsed-mongo-sdk',
    connectionOptions: {
      autoIndex: !isProduction,
    }
  }],
  // additional shared configuration
};
