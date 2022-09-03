import { MockContainer } from './container/MockContainer';

import Koa from 'koa';
import Router from 'koa-router';
import web3 from 'web3';
import crypto from 'crypto';
import cors from '@koa/cors';
import { authClient, authClients } from './twitter/TwitterProductionApi';
import Client from 'twitter-api-sdk';
import { config } from '@unioncredit/data'
import { stateAccount } from './account/AccountState';
import { UnionDataFetcher } from './union/UnionDataFetcher';
import { TwitterDataFetcher } from './twitter/TwitterDataFetcher';


const container = new MockContainer().create();


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
    const accountAddress = ctx.query.accountAddress;

    if (!(typeof accountAddress === 'string')) {
        throw new Error('AccountAddress is necerrary');
    }

    const state = crypto.randomUUID();
    const authUrl = authClient.generateAuthURL({
        code_challenge_method: "s256",
        state,
    });
    stateAccount[state] = accountAddress;

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

    const account = stateAccount[state];

    ctx.status = 301;
    ctx.redirect(`http://localhost:3000/twitter?state=${state}&account=${account}`);
});

router.get('/twitter-friends', async (ctx) => {
    const state = ctx.query.state;
    if (typeof state !== 'string') {
        throw new Error('bad input')
    }
    container.get(TwitterDataFetcher).setState(state);
    const usersResponse = await container.get(TwitterDataFetcher).getFollowing();

    ctx.response.body = {
        usersResponse
    };
    ctx.response.status = 200;
});

router.get('/union-account-stakes', async (ctx) => {
    /*
        okay, so the contracts are not avaible here.

        I think we create a child contract or something when the 
        stake is started.

        i.e 0xd0f46a5d48596409264d4eFc1f3B229878fFf743
            - nooo, this is wrong. This is just antoher person domain
            - I thin the problem is with the grapth
    */
    if (typeof ctx.query.value === 'string') {
        ctx.response.body = await container.get(UnionDataFetcher).getStake({ address: ctx.query.value });
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
