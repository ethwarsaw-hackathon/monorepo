pragma solidity ^0.8.16;

contract UnionMulticall {
    function mutliTrustAndVouch() public {
        /*
            TODO:
            Call the `RegisterMember` and `UpdateTrust` functions in the Union contacts.
        */
    }

    function multiCall(ContractCall[] memory calls)
        private
        returns (bytes[] memory returnData)
    {
        returnData = new bytes[](calls.length);
        for (uint256 i = 0; i < calls.length; i++) {
            (bool success, bytes memory ret) = calls[i].target.call(
                calls[i].callData
            );
            require(success);
            returnData[i] = ret;
        }
    }
}

struct ContractCall {
    address target;
    bytes callData;
}
