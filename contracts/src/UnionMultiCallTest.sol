pragma solidity ^0.8.16;

import "forge-std/Test.sol";

contract UnionMulticallTest is Test {
    uint256 testNumber;

    function setUp() public {
        testNumber = 42;
    }

    
    function testMultiVoucher() public {
        /*
            TODO:
                Calling multi voucher should should do the following
                - vouch for a given address.
                - trust them with a spefic amount.
        */
    }

    function testBurnOnBehalfOf() public {
        /*
            TODO:
                Calling this should burn 1 Union token on behalf of a user,
                This is done by calling the `registerMember` function in the 
                union contract.
        */
    }
}
