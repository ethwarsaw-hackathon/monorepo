import { authClients } from "./TwitterProductionApi";


export abstract class TwitterDataFetcher {
    public abstract setState(state: string): void;
    public abstract getFollowing(): Promise<Users>;
}

export type Users = Array<{ name: string; image?: string }>;