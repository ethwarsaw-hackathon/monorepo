# Contracts

# Requirments
- We need to do a `stake` call to preform the stake.
    - We also need to do a `approve` call to approve the transfer of the dai.
- If we are going to onboard new users we use the `registerMember` call.
    - Then we should ideally also transfer some union tokens, so that they are onboarded in one go.
- Then it's just to call the `UpdateTrust` contract in one go, and have that iterate over list of borrowers, and not just a single account.

