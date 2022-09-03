import { TwitterDataFetcher } from "../twitter/TwitterDataFetcher";
import { TwitterMockApi } from "../twitter/TwitterMockApi";
import { UnionDataFetcher } from "../union/UnionDataFetcher";
import { UnionDataFetcherMock } from "../union/UnionDataFetcherMock";
import { CoreContainer } from "./CoreContainer";

export class MockContainer extends CoreContainer {
    public create() {
        const container = super.create();
        container.bind(UnionDataFetcher).to(UnionDataFetcherMock)
        container.bind(TwitterDataFetcher).to(TwitterMockApi)

        return container;
    }
}

