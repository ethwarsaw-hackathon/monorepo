import { injectable } from "inversify";
import { TwitterDataFetcher, Users } from "./TwitterDataFetcher";


@injectable()
export class TwitterMockApi implements TwitterDataFetcher {
    public setState(state: string): void {
    }

    public async getFollowing(): Promise<Users> {
        return [
            {
                name: 'Vira Melnyk',
                screenName: 'vira'
            },
            {
                name: 'Lyubov Shevchenko',
                screenName: 'lyubov'
            },
            {
                name: 'Bohdan Bondarenko',
                screenName: 'bodhan'
            },
            {
                name: 'Nadiya Honcharuk',
                screenName: 'nadiya',
            },
        ]
    }
}
