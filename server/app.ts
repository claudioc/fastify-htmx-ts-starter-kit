import bootstrap from './lib/bootstrap';

const app = bootstrap();

(async () => {
  try {
    await app.listen({ port: Number(process.env.PORT || 3000) });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
