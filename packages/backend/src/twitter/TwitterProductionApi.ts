import * as dotenv from 'dotenv';
import { injectable } from 'inversify';
import { auth, Client } from "twitter-api-sdk";
import { TwitterDataFetcher, Users } from './TwitterDataFetcher';
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

@injectable()
export class TwitterProductionApi implements TwitterDataFetcher {
    private state?: string;

    public setState(state: string): void {
        this.state = state;
    }

    public async getFollowing(): Promise<Users> {
        if (typeof this.state !== 'string' || !(this.state in authClients)) {
            throw new Error('You sent a fake callback.')
        }
        const client = authClients[this.state];
        const results = await client.users.usersIdFollowing('1416633667', {
            max_results: 100,
            "user.fields": ['profile_image_url']
        })
        const users = results.data;
        const usersResponse: Users = [];
        for (const user of (users || [])) {
            if (user.username) {
                usersResponse.push({
                    name: user.name,
                    image: user.profile_image_url,
                    screenName: user.username,
                })
            }
        }

        return usersResponse;
    }
}
