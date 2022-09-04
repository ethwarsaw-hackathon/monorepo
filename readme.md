# Monorepo for the Poruka hackathon project
- We used idriss [ts-library](https://github.com/idriss-crypto/ts-library) to get an Ethereum address from a twitter friendship.
- We used [Ramp](https://ramp.network/) to allow easy onboarding.
- We used the Union finance [data library](https://github.com/unioncredit/union-data) for fetching contract state from Union, and integrated with there smart contracts with our custom contract.

## Project Structure

### contracts/
The smart contract component that was created to allow multiple vouchers in a single transaction.

### packages/
The backend and frontend packages.

## Containers
Because of some problems with the data provider in the union sdk, and rate limiting on twitter an container layout with mocking was added.

The coded for production is also added, but not used by default because of the problems mentioend above. That said, the code for production should in theorhy work, but because of limited time the entire integration was not inplace.

