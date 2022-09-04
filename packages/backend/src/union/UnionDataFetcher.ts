import BigNumber from "bignumber.js";


export abstract class UnionDataFetcher {
    public abstract hasAccount(value: string): Promise<boolean>;

    public abstract getStake({ address }: { address: string }): Promise<BigNumber>
}
