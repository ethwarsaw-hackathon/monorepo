import { TwitterDataFetcher, Users } from "./TwitterDataFetcher";


export class TwitterMockApi implements TwitterDataFetcher {
    public setState(state: string): void {
    }

    public async getFollowing(): Promise<Users> {
        return [
            {
                name: 'test1',
            }
        ]
    }
}
