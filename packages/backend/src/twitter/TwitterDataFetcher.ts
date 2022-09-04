
export abstract class TwitterDataFetcher {
    public abstract setState(state: string): void;
    public abstract getFollowing({userId}: {userId: string}): Promise<Users>;
}

export type Users = Array<{ name: string; image?: string; screenName: string }>;
