import { fetchAccountStakes } from "@unioncredit/data";
import BigNumber from "bignumber.js";
import { injectable } from "inversify";
import { UnionDataFetcher } from "./UnionDataFetcher";

@injectable()
export class UnionDataFetcherProduction implements UnionDataFetcher {
    public hasAccount(value: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    public async getStake({ address }: { address: string }): Promise<BigNumber> {
        const accountState = await fetchAccountStakes(
            address
        );

        const stake = accountState.map((item) => {
            return {
                ...item,
            }
        });

        return new BigNumber(stake[0].stakedAmount);
    }
}
