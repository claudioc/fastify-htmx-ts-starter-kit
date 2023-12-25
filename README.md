# Fastify + TypeScript + HTMX starter kit

Motivation: **I am sick of React and frontend building and bundling issues. I just want to build staff**.

The goal of this starter kit is to provide a slightly opinionated but super simple way to get started with a project that has some logic on the backend and some logic on the frontend. A typical use case could be a single page that fetches some information from a third-party API, but you also want to have a small backend where to keep your API keys and maybe a cache to avoid hitting a rate limit on those external APIs.

The kit contains:
- A server ([Fastify](https://fastify.dev/) with some plugins)
- A client (just TypeScript, no frameworks, which you can extend with your logic)
- A demo micro application: reads the current server time and displays it in the browser, auto-refreshing every 30s (or manually)
- Server side error handling
- Linting

I have also created a (now deprecated) [similar starter kit](https://github.com/claudioc/node-htmx-ts-starter-kit/) using Express if you prefer that server.

## Tech stack
- [Fastify](https://fastify.dev/)
- [EJS](https://ejs.co/) templates
- TypeScript
- [HTMX](https://htmx.org/) for the frontend to speak to the backend
- [Chota](https://jenil.github.io/chota/) framework for the CSS, because it's small and cute

I am not even using `ts-node` because it's not needed for a small project.

### Additional plugins:
- Helmet for security
- Static for serving static assets

### Additional tools provided:
- concurrently
- nodemon
- dotenv
- eslint with ts support (extends just the recommended rule set)
- prettier and a bare-bone config
- client's and server's own tsconfig which extends a base one

### Bonus
- There is an example of how to write a HTMX extension
- Configurations are all in the package.json

### Suggested Visual Studio Code extensions
- EJS language support
- Prettier
- Pretty TypeScript Errors

## Project structure

- `server/app.ts` contains just the bare-bone bootstrap code for the server
- `server/lib` contains any additional server module: `bootstrap.ts` is the module setting up Fastify and its plugins, `router.ts` contains the routes definition and the error handling, `assets.ts` is used to generate a cache proof name for the assets. There are also some `constants.ts`
- `server/views` contains the view templates in EJS format (HTML + embedded JS). EJS doesn't have the concept of "layouts" or "slots", so in our case, we build each "full page" using partials: header + body + footer. If your app grows in complexity you may want to reconsider this design choice and use a layout-based template system
- `client/app.ts` contains just some code that it's run when the page is loaded in the browser
- `client/lib/tools.ts` is just used as an example of natively including a js module at runtime
- `assets` contains js, css, and vendor files. Keep in mind that the js assets are symlinked from the `dist` directory. All the assets are mounted under the `/a` virtual folder

Since this project doesn't use `ts-node`, your app is run directly from the `dist` folder (check the script in package.json to understand how) where the view templates are not copied (because they do not require compilation).

## Try it

Note that it doesn't work on Windows out-of-the-box (makes use of symlinks and bash).

- npm i
- npm run dev
- open http://localhost:3000

You also have `npm lint`, `npm build` and of course `npm start` (for production).

## Use it in your project

Some options:

- Download the latest archive from [Github releases](https://github.com/claudioc/fastify-htmx-ts-starter-kit/releases) or from the "Code" button in the repository main page
- Clone the repo, and then `rm -rf` its `.git` directory (github doesn't support `git archive` and git doesn't have a `export` command like svn does)

This project uses ESLint and Prettier: don't forget to install/enable their extension in Visual Studio Code.

To not mess things up, we are not using "eslint-prettier" or similar, but you can try it if you want.

## Deployment

This is on you. I own a small VPS and I run all my projects from there. Ideally, you want to run this process behind a reverse proxy where you also end your TLS connection. I use ngnix and letsencrypt for my tls certificates.

If you have successfully deployed a project inherited from this kit, in some cloud, and you want to share the steps please open a PR!

## What is missing

- no cookie support, because we hate cookie banners
- Assets are not tgz compressed because this should be the job of your reverse proxy
- I use ejs for its simplicity but I don't like not having a type checking in the templates. It should be nice to use JSX, but the risk is to complicate things too much
- Both server and client code reside in the same git repository, and they both share the same package.json and node_modules and that's OK for relatively small project, but you can also decide to move to a monorepo layout using something like [nx](https://nx.dev/) or [TurboRepo](https://turbo.build/) for managing it
- Only the main client js module (app.js) is provided with a cache-bust parameter, whereas any imported module (as in `tools.js` in this project) is not, which means that they only rely to the cache settings of the static middleware. I will leave it up to you to decide if that's enough or if you want to add an additional build step to handle such cases

## Where are the tests!?

A testing system is also not installed by default, but if you are like me and love [Vitest](https://vitest.dev/), just follow these instructions (for the client, but it should work for the server as well):

- `npm install vitest --save-dev`
- Edit `client/tsconfig.json` and add an `exclude` option for your tests: this is because vitest doesn't use `tsc` for the typescript sources and you should tell `tsc` to not compile and build the tests
- Add a `test` script in your package.json with something like `vitest ./client/**/*.spec.ts`
- Since we are excluding tests from the TS projects, eslint won't be able to find them anymore and we need to put them back somewhere. To do so, you can [follow these instructions](https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file). I would add a `tsconfig.eslint.json` which extends our base, doesn't emit and includes the test files
- Write your tests away!
