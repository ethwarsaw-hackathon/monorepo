import { TwitterDataFetcher } from "../twitter/TwitterDataFetcher";
import { TwitterProductionApi } from "../twitter/TwitterProductionApi";
import { UnionDataFetcher } from "../union/UnionDataFetcher";
import { UnionDataFetcherProduction } from "../union/UnionDataFetcherProduction";
import { CoreContainer } from "./CoreContainer";

export class ProductionContainer extends CoreContainer {
    public create() {
        const container = super.create();
        container.bind(UnionDataFetcher).to(UnionDataFetcherProduction)
        container.bind(TwitterDataFetcher).to(TwitterProductionApi)

        return container;
    }
}

