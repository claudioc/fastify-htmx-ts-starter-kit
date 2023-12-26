import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import staticServe from '@fastify/static';
import path from 'path';
import router from './router';
import dotenv from 'dotenv';
import { ASSETS_MOUNT_POINT, ASSETS_PATH } from './constants.js';
import { PinoLoggerOptions } from 'fastify/types/logger';
import { NodeEnv } from '../types';
import jsxRender from './jsxRender';

dotenv.config();

const envToLogger: Record<NodeEnv, PinoLoggerOptions | boolean> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname,reqId,res',
      },
    },
  },
  production: true,
};

const app = Fastify({
  logger:
    envToLogger[(process.env.NODE_ENV as NodeEnv) || 'development'] ?? true,
});

app.addHook('preSerialization', jsxRender.preSerialization);
app.addHook('onSend', jsxRender.onSend);

app
  .register(helmet, {
    contentSecurityPolicy: {
      // If you get stuck in CSP, try this: crossOriginEmbedderPolicy: false,
      directives: {
        'script-src': ["'self'", "'unsafe-inline'"],
      },
    },
  })

  .register(staticServe, {
    root: path.join(__dirname, ASSETS_PATH),
    prefix: `/${ASSETS_MOUNT_POINT}`,
  })

  .register(router);

export default () => app;
