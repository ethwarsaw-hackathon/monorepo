import Koa from 'koa';
import Router from 'koa-router';
import { IdrissCrypto } from "idriss-crypto";
import web3 from 'web3';
import { auth, Client } from "twitter-api-sdk";
import * as dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config()

const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;
if (!twitterBearerToken) {
    throw new Error('Missing bearer token');
}

var app = new Koa();
var router = new Router();

router.get('/', (ctx) => {
    ctx.response.body = 'ok';
});

const [client_id, client_secret] = [process.env.TWITTER_CLIENT_ID, process.env.TWITTER_CLIENT_SECRET]
if ((!client_id || !client_secret)) {
    throw new Error('bad parameters')
}
const authClient = new auth.OAuth2User({
    client_id,
    client_secret,
    callback: "http://localhost:4242/callback",
    scopes: ["tweet.read", "follows.read", "users.read", "offline.access"],
});

router.get('/resolve', async (ctx) => {
    if (ctx.query.value) {
        const idriss = new IdrissCrypto();
        const resultEmail = await idriss.resolve("hello@idriss.xyz");

        ctx.response.body = resultEmail;
        ctx.response.status = 200;
    } else {
        ctx.response.body = 'missing value parameters';
        ctx.response.status = 400;
    }
});

router.get('/abi', async (ctx) => {
    if (ctx.query.value) {
        const abiEncoding = new web3().eth.abi.encodeFunctionSignature('myMethod(uint256,string)')

        ctx.response.body = abiEncoding;
        ctx.response.status = 200;
    } else {
        ctx.response.body = 'missing value parameters';
        ctx.response.status = 400;
    }
});

router.get('/twitter-auth', async (ctx) => {
    const authUrl = authClient.generateAuthURL({
        code_challenge_method: "s256",
        state: crypto.randomUUID(),
    });
    console.log(authUrl);
});


router.get('/callback', async (ctx) => {
    const code = ctx.query.code;
    if (!(typeof code === 'string')){
        throw new Error('You sent a fake callback.')
    }
    console.log(code);
    const token = await authClient.requestAccessToken(code);
    const realToken = token.token.access_token
    if (!realToken){
        throw new Error('missing real token')
    }
    const client = new Client(realToken);
    const results = await client.users.usersIdFollowing('38895958', {max_results: 100})
    console.log(results)
});


app
    .use(router.routes())
    .use(router.allowedMethods());
console.log('Listening on http://localhost:4242')
app.listen(4242);
