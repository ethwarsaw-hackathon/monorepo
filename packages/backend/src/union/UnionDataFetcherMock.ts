import BigNumber from "bignumber.js";
import { injectable } from "inversify";
import { UnionDataFetcher } from "./UnionDataFetcher";

@injectable()
export class UnionDataFetcherMock implements UnionDataFetcher {
    public async getStake(): Promise<BigNumber> {
        return new BigNumber(1000);
    }
}
