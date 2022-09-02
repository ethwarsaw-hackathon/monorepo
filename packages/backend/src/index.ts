import Koa from 'koa';
import Router from 'koa-router';

var app = new Koa();
var router = new Router();

router.get('/', (ctx) => {
  // ctx.router available
  ctx.response.body = 'ok';
});

app
  .use(router.routes())
  .use(router.allowedMethods());
console.log('Listening on http://localhost:4242')
app.listen(4242);
