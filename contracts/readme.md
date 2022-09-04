# Contracts

## Requirments
- We need to do a `stake` call to preform the stake.
    - We also need to do a `approve` call to approve the transfer of the dai.
- If we are going to onboard new users we use the `registerMember` call.
    - Then we should ideally also transfer some union tokens, so that they are onboarded in one go without the receiver having to wait for the union tokens.
- Then it's just to call the `UpdateTrust` contract in one go, and have that iterate over list of borrowers, and not just a single account.

I.e we need to add support for `multiCall` to `UpdateTrust`, and a way to on board users in one go.

Maybe we should just fork the union protocol, and remove the need to burn the union tokens.
