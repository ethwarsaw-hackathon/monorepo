# Contracts

## Requirements to make the Union integration smooth
- We need to do a `stake` call to preform the stake.
    - We also need to do a `approve` call to approve the transfer of the dai.
- If we are going to onboard new users we use the `registerMember` call.
    - Then we should ideally also transfer some union tokens, so that they are on-boarded in one go without the receiver having to wait for the union tokens.
- Then it's just to call the `UpdateTrust` contract in one go, and have that iterate over list of borrowers, and not just a single account.

I.e we need to add support for `multiCall` to `UpdateTrust`, and a way to on board users in one go.

Maybe we should just fork the union protocol, and remove the need to burn the union tokens. Why is it even there ? I sit to protect against people lending between themself ? 

## Requirements to make the on-ramping smooth
As far as I can see there is no way to specify calldata when buying with ramp. Maybe we could ask them if they could add that.
Then it could be sent directly to a smart contract that handles the distribution based on what the user specified in the frontend. 
