import Koa from 'koa';
import Router from 'koa-router';
import {IdrissCrypto} from "idriss-crypto";
import web3 from 'web3';

var app = new Koa();
var router = new Router();

router.get('/', (ctx) => {
  ctx.response.body = 'ok';
});

router.get('/resolve', async (ctx) => {
    if (ctx.query.value){
        const idriss = new IdrissCrypto();
        const resultEmail = await idriss.resolve("hello@idriss.xyz");

        ctx.response.body = resultEmail;
        ctx.response.status = 200;
    } else {
        ctx.response.body = 'missing value parameters';
        ctx.response.status = 400;
    }
});

router.get('/abi', async (ctx) => {
    if (ctx.query.value){
        const abiEncoding = new web3().eth.abi.encodeFunctionSignature('myMethod(uint256,string)')

        ctx.response.body = abiEncoding;
        ctx.response.status = 200;
    } else {
        ctx.response.body = 'missing value parameters';
        ctx.response.status = 400;
    }
});


app
  .use(router.routes())
  .use(router.allowedMethods());
console.log('Listening on http://localhost:4242')
app.listen(4242);
