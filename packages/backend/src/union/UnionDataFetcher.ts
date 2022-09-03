import BigNumber from "bignumber.js";


export abstract class UnionDataFetcher {
    public abstract getStake({ address }: { address: string }): Promise<BigNumber>
}
