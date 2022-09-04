import { injectable } from "inversify";
import { TwitterDataFetcher } from "../twitter/TwitterDataFetcher";
import { ResolveTwitterUsernameInteractor } from "./ResolveTwitterUsernameInteractor";

@injectable()
export class FetchTwitterAddressBook {
    constructor(
        private twitterDataFetcher: TwitterDataFetcher,
        private resolveTwitterUsernameInteractor: ResolveTwitterUsernameInteractor,
    ) {}

    public async getAddressBook({userId}: {userId: string}) {
        const users = await this.twitterDataFetcher.getFollowing({userId});
        return await Promise.all(users.map(async (item) => ({
            ...item,
            address: (await this.resolveTwitterUsernameInteractor.getEthereumAddress({
                screenname: item.screenName
            }))
        })))
    }
}
