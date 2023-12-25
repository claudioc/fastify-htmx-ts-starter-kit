import { cssFile, jsFile } from './assets';
import { FastifyError, FastifyInstance } from 'fastify';
import { PageModel, PartialModel } from '../types';
import { PAGE_TITLE } from './constants';

interface IndexPageModel extends PageModel, PartialModel {}
interface ErrorPageModel extends PageModel {
  error: FastifyError;
}

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
const router = async (app: FastifyInstance) => {
  // Renders the home page
  app.get('/', async (_req, reply) => {
    return reply.view<IndexPageModel>('index', {
      title: PAGE_TITLE,
      cssFile,
      jsFile,
      error: null,
      currentTime: new Date().toISOString(),
    });
  });

  // Renders the server time partial upon HTMX request
  app.get('/api/server-time', async (_req, reply) => {
    return reply.view<PartialModel>('partials/serverTime', {
      error: null,
      currentTime: new Date().toISOString(),
    });
  });

  app.setNotFoundHandler((_req, reply) => {
    return reply.view<PageModel>('404', {
      title: `${PAGE_TITLE} - Page not found`,
      cssFile,
      jsFile,
    });
  });

  app.setErrorHandler((err, req, reply) => {
    app.log.error(err);
    // Fastify will lowercase the header name
    if (req.headers['hx-request']) {
      // If the request is a HTMX request, we send the error message as
      // a normal partial response.
      return reply.view<PartialModel>('partials/serverTime', {
        error: 'An unexpected error occurred',
        currentTime: 'N/A',
      });
    } else {
      return reply.view<ErrorPageModel>('error', {
        title: `${PAGE_TITLE} - Unhandled error`,
        error: err,
        cssFile,
        jsFile,
      });
    }
  });
};

export default router;
