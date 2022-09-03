import * as dotenv from 'dotenv';
import { auth, Client } from "twitter-api-sdk";
dotenv.config()

const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;
if (!twitterBearerToken) {
    throw new Error('Missing bearer token');
}

const [client_id, client_secret] = [process.env.TWITTER_CLIENT_ID, process.env.TWITTER_CLIENT_SECRET]
if ((!client_id || !client_secret)) {
    throw new Error('bad parameters')
}
export const authClient = new auth.OAuth2User({
    client_id,
    client_secret,
    callback: "http://localhost:4242/callback",
    scopes: ["tweet.read", "follows.read", "users.read", "offline.access"],
});

export const authClients: Record<string, Client> = {}


export function getFollowing() {

}
