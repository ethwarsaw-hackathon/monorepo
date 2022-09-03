import React from "react";
import { useState } from "react";

export function Metamask(props: Props) {
    const ethereum = (window as { ethereum?: any }).ethereum;
    const [accountAddress, setAccountAddress] = useState<string | null>();
    if (typeof ethereum === 'undefined') {
        return (
            <React.Fragment>No metamask :(</React.Fragment>
        );
    }

    return (
        props.children({
            accountAddress,
            requestAccount: async () => {
                const account = await ethereum.request({ method: 'eth_requestAccounts' });
                setAccountAddress(account[0]);
            },
        })
    )
}


interface Props {
    children: (options: {
        accountAddress?: string | null;
        requestAccount: () => void
    }) => JSX.Element;
}
