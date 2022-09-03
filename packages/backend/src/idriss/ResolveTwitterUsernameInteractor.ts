import { IdrissCrypto } from "idriss-crypto";

export class ResolveTwitterUsernameInteractor {
    public async getEthereumAddress({ screenname }: { screenname: string }) {
        const idriss = new IdrissCrypto();
        const resultsTwitter = await idriss.resolve(`@${screenname}`);
        console.log(resultsTwitter);
        if (Object.entries(resultsTwitter).length === 0) {
            return null;
        } else {
            /*
                { 'Metamask ETH': '0x67CE139C5DCC845F08CE4b4E25B96B005f326B9B' }
                // TODO resolve to a single address
            */
            return 'maybe';
        }
    }
}

