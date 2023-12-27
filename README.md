# Fastify + HTMX + TypeScript starter kit

This starter kit aims to offer an efficient approach for initiating projects with both backend and frontend logic. It's designed to utilize a modern tech stack while maintaining minimal dependencies for simplicity and effectiveness.

This project renders all the HTML on the server (SSR), using JSX as the template language and HTMX to (progressively) enhance the frontend interactions. Let me clarify it once more: **JSX is only used on the server, not on the client. The client is NOT a React application**.

 A typical use case could be a single web page that fetches some information from a third-party API, but you also want to have a small backend where to keep your API keys and maybe a cache to avoid hitting a rate limit on those external APIs.

The kit contains:
- A server application based on [Fastify](https://fastify.dev/)
- A client application (no frameworks, just TypeScript)
- A demo micro application using [HTMX](https://htmx.org/): reads the current server time and displays it in the browser, auto-refreshing every 30s (or manually)
- Server side error handling (500s and 404s)
- Linting (via eslint and some plugins)
- JSX rendering using just TS and [Preact](https://preactjs.com/)

The kit does NOT contain:
- a JavaScript or CSS bundler
- Tests (but read at the end for some suggestions)
- Deployment instructions
- Sophisticated cache busting strategies for the client
- `ts-node` because we can do without it

Probably worth mentioning that I have also created a (now deprecated) [similar starter kit](https://github.com/claudioc/node-htmx-ts-starter-kit/) using Express and EJS (not JSX) if you prefer that server. I would suggest to not use it.

At the time of writing, **Windows has not been tested as a dev environment**.

## Install

```sh
npm create fastify-htmx-ts-app@latest my-app
# or
npx fastify-htmx-ts-app@latest my-app
```

After that, you have to install dependencies using your favourite package manager (i.e. `npm`) and run some commands:

- npm i
- npm run dev
- open http://localhost:3000

You also have `npm lint`, `npm build` and of course `npm start` (for production).

## Tech stack
- [Fastify](https://fastify.dev/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx) templates
- TypeScript everywhere
- [HTMX](https://htmx.org/) for the frontend to speak to the backend
- [Chota](https://jenil.github.io/chota/) framework for the CSS, because it's small and cute
- [Helmet](https://github.com/fastify/fastify-helmet) for security
- [Static](https://github.com/fastify/fastify-static) for serving static assets

### Additional tools provided
- concurrently
- nodemon
- dotenv
- prettier and a bare-bone config
- client's and server's own tsconfig which extends a base one

**This project uses ESLint and Prettier: don't forget to install/enable their extension in Visual Studio Code.**

### Bonus
- There is an example of how to write a HTMX extension
- Configurations are all in the package.json to remove clutter

## Project structure

- `server/app.ts` contains just the bare-bone startup code for the server
- `server/lib` contains any additional server module:
  - `bootstrap.ts` is the module setting up Fastify and its plugins
  - `jsxRender` is what makes it possible to use JSX with Fastify, as [explained in the original post](https://evertpot.com/jsx-template/)
  - `router.tsx` contains the routes definition and the error handling
  - `assets.ts` is used to generate a cache proof name for the assets
  - There are also some `constants.ts`
- `server/views` contains the view templates in JSX format, mostly the Pages and the Components.
- `client/app.ts` contains just some code that it's run when the page is loaded in the browser
- `client/lib/tools.ts` is just used as an example of natively including a js module at runtime
- `assets` contains js, css, and vendor files. Keep in mind that the js assets are symlinked from the `dist` directory. All the assets are mounted under the `/a` virtual folder

Since this project doesn't use `ts-node`, your app is run directly from the `dist` folder (check the script in package.json to understand how).

## Deployment

This is on you. I own a small VPS and I run all my projects from there. I to run the server process behind a reverse proxy where I also end the TLS connection. I use ngnix and letsencrypt for my tls certificates. I find the guides from DigitalOcean extremely valuable for this kind of setup:
- [How to set up a node.js application for production on ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04)
- [How To Secure Nginx with Let's Encrypt on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04)

If you have successfully deployed a project inherited from this kit, in some cloud, and you want to share the steps please open a PR!

## What is missing

- There is no cookie support, because we hate cookie banners
- Assets are not tgz compressed because this should be the job of your reverse proxy
- Both server and client code reside in the same git repository, and they both share the same package.json and node_modules and that's OK for relatively small project, but you can also decide to move to a monorepo layout using something like [nx](https://nx.dev/) or [TurboRepo](https://turbo.build/) for managing it
- Only the main client js module (app.js) is provided with a cache-bust parameter, whereas any imported module (as in `tools.js` in this project) is not, which means that they only rely to the cache settings of the static middleware. I will leave it up to you to decide if that's enough or if you want to add an additional build step to handle such cases

## Where are the tests!?

A testing system is also not installed by default, but if you are like me and love [Vitest](https://vitest.dev/), just follow these instructions (for the client, but it should work for the server as well):

- `npm install vitest --save-dev`
- Edit `client/tsconfig.json` and add an `exclude` option for your tests: this is because vitest doesn't use `tsc` for the typescript sources and you should tell `tsc` to not compile and build the tests
- Add a `test` script in your package.json with something like `vitest ./client/**/*.spec.ts`
- Since we are excluding tests from the TS projects, eslint won't be able to find them anymore and we need to put them back somewhere. To do so, you can [follow these instructions](https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file). I would add a `tsconfig.eslint.json` which extends our base, doesn't emit and includes the test files
- Write your tests away!
