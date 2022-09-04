import { IdrissCrypto } from "idriss-crypto";
import { injectable } from "inversify";
import { UnionDataFetcher } from "../union/UnionDataFetcher";

@injectable()
export class ResolveTwitterUsernameInteractor {
    constructor(
        private unionDataFetcher: UnionDataFetcher,
    ) { }

    public async getEthereumAddress({ screenname }: { screenname: string }) {
        const idriss = new IdrissCrypto();
        const resultsTwitter = await idriss.resolve(`@${screenname}`);

        const foundAccount = Object.values(resultsTwitter).find((value) => this.unionDataFetcher.hasAccount(value));

        if (!foundAccount || Object.entries(resultsTwitter).length === 0) {
            return null;
        } else if (foundAccount) {
            return foundAccount;
        } else {
            return Object.values(resultsTwitter)[0];
        }
    }
}
