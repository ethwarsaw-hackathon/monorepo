import Koa from 'koa';
import Router from 'koa-router';
import web3 from 'web3';
import crypto from 'crypto';
import cors from '@koa/cors';
import { authClient, authClients } from './twitter/TwitterProductionApi';
import Client from 'twitter-api-sdk';
import { config, fetchAccountStakes, fetchAccountTrusted, fetchAccountTrusting, fetchStakers } from '@unioncredit/data'
import { BigNumber } from 'bignumber.js';

config.set('chainId', '42')


var app = new Koa();
var router = new Router();

router.get('/', (ctx) => {
    ctx.response.body = 'ok';
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
    const state = crypto.randomUUID();
    const authUrl = authClient.generateAuthURL({
        code_challenge_method: "s256",
        state,
    });
    ctx.response.body = {
        authUrl,
        state
    };
    ctx.response.status = 200;
});

router.get('/callback', async (ctx) => {
    const code = ctx.query.code;
    const state = ctx.query.state;
    if (!(typeof code === 'string') || !(typeof state === 'string')) {
        throw new Error('You sent a fake callback.')
    }
    const token = await authClient.requestAccessToken(code);
    const realToken = token.token.access_token
    if (!realToken) {
        throw new Error('missing real token')
    }
    authClients[state] = new Client(realToken)

    ctx.status = 301;
    ctx.redirect(`http://localhost:3000/twitter?state=${state}`);
});

router.get('/twitter-friends', async (ctx) => {
    const state = ctx.query.state;
    if (typeof state !== 'string' || !(state in authClients)) {
        throw new Error('You sent a fake callback.')
    }
    const client = authClients[state];
    const results = await client.users.usersIdFollowing('1416633667', {
        max_results: 100,
        "user.fields": ['profile_image_url']
    })
    const users = results.data;
    const usersResponse: Array<{ name: string; image?: string }> = [];
    for (const user of (users || [])) {
        if (user.username) {
            usersResponse.push({
                name: user.name,
                image: user.profile_image_url,
            })
        }
    }
    ctx.response.body = {
        usersResponse
    };
    ctx.response.status = 200;
});

router.get('/union-account-trusting-me', async (ctx) => {
    /*
        okay, so the contracts are not avaible here.

        I think we create a child contract or something when the 
        stake is started.

        i.e 0xd0f46a5d48596409264d4eFc1f3B229878fFf743

    */
    if (typeof ctx.query.value === 'string') {
        const accountState = await fetchAccountTrusting(
            ctx.query.value
        );

        //ctx.response.body = accountState;
        ctx.response.body = accountState.map((item) => {
            return {
                ...item,
                amount: new BigNumber(item.amount).div(new BigNumber(10).pow(18)).toString()
            }
        });
        ctx.response.status = 200;
    } else {
        ctx.response.body = 'missing value parameters';
        ctx.response.status = 400;
    }
});

router.get('/union-account-i-trust', async (ctx) => {
    /*
        okay, so the contracts are not avaible here.

        I think we create a child contract or something when the 
        stake is started.

        i.e 0xd0f46a5d48596409264d4eFc1f3B229878fFf743
    */
    if (typeof ctx.query.value === 'string') {
        const accountState = await fetchAccountTrusted(
            ctx.query.value
        );

        ctx.response.body = accountState.map((item) => {
            return {
                ...item,
                amount: new BigNumber(item.amount).div(new BigNumber(10).pow(18)).toString()
            }
        });
        ctx.response.status = 200;
    } else {
        ctx.response.body = 'missing value parameters';
        ctx.response.status = 400;
    }
});

router.get('/union-account-stakes', async (ctx) => {
    /*
        okay, so the contracts are not avaible here.

        I think we create a child contract or something when the 
        stake is started.

        i.e 0xd0f46a5d48596409264d4eFc1f3B229878fFf743
    */
    if (typeof ctx.query.value === 'string') {
        const accountState = await fetchAccountStakes(
            ctx.query.value
        );

        ctx.response.body = accountState.map((item) => {
            return {
                ...item,
            }
        });
        ctx.response.status = 200;
    } else {
        ctx.response.body = 'missing value parameters';
        ctx.response.status = 400;
    }
});

app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
console.log('Listening on http://localhost:4242')
app.listen(4242);
