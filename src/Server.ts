import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import methodOverride from 'method-override';
import cors from 'cors';
import '@tsed/ajv';
import '@tsed/swagger';
import '@tsed/mongoose';
import { config, rootDir } from './config';
import { IndexCtrl } from './controllers/pages/IndexController';
import { isProduction } from './config/env';

const helmetOptions = isProduction ? {
  contentSecurityPolicy: false,
  expectCt: false,
  referrerPolicy: false,
  permittedCrossDomainPolicies: false,
} : {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc: ['\'self\'', '\'unsafe-inline\''],
      imgSrc: ['\'self\'', 'data:', 'https:'],
      scriptSrc: ['\'self\'', 'https: \'unsafe-inline\''],
    },
  },
  expectCt: false,
  referrerPolicy: false,
  permittedCrossDomainPolicies: false,
};

@Configuration({
  ...config,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8000,
  httpsPort: false, // CHANGE
  mount: {
    '/_api/v1': [
      `${rootDir}/controllers/**/*.ts`
    ],
    '/': [
      IndexCtrl
    ]
  },
  middlewares: [
    helmet(helmetOptions),
  ],
  swagger: [
    {
      path: '/_docs',
      specVersion: '3.0.1'
    }
  ],
  views: {
    root: `${rootDir}/views`,
    extensions: {
      ejs: 'ejs'
    }
  },
  exclude: [
    '**/*.spec.ts'
  ]
})

export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
