import React from "react";
import { useState } from "react";

export function Metamask(props: Props) {
    const ethereum = (window as { ethereum?: any }).ethereum;
    const [accountAddress, setAccountAddress] = useState<string | null>();
    const [signedMessage, setSignedMessage] = useState<boolean>(false);
    const [balance, setBalance] = useState<number | null>(1000);
    
    if (typeof ethereum === 'undefined') {
        return (
            <React.Fragment>No metamask :(</React.Fragment>
        );
    }

    return (
        props.children({
            accountAddress,
            signedMessage,
            sign: async () => {
                const [account] = await ethereum.request({ method: 'eth_requestAccounts' });
                await ethereum.request({ method: 'personal_sign', params: [ 'contract call', account ] });
                setSignedMessage(false);
            },
            requestAccount: async () => {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                setAccountAddress(accounts[0]);
            },
            balance,
            setBalance: async () => {
                //  TODO: This should be exposed throught metamask, but could also just be an api call to the backend.
                //  Hardcoded for now.
            }
        })
    )
}


interface Props {
    children: (options: {
        signedMessage: boolean;
        accountAddress?: string | null;
        balance?: number | null;
        setBalance: () => void;
        requestAccount: () => Promise<void>;
        sign: () => Promise<void>;
    }) => JSX.Element;
}
