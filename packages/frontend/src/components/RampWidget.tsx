import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import { TAllEvents } from "@ramp-network/ramp-instant-sdk/dist/types/types";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";

export function RampWidget(props: Props) {
    const [rampInstance, setRampInstance] = useState<RampInstantSDK>();
    useEffect(() => {
        if (props.show && !rampInstance) {
            setRampInstance(new RampInstantSDK({
                hostAppName: 'Poruka',
                hostLogoUrl: 'https://yourdapp.com/yourlogo.png',
                fiatValue: props.amount,
                swapAsset: 'ETH_DAI',
                fiatCurrency: 'USD',
                userAddress: 'user blockchain address',
            })
                .on('*', props.onEvent)
                .show()
            );
        }
    }, [props.show])

    return null;
}

interface Props {
    amount: string;
    show: boolean;
    onEvent: (event: TAllEvents) => void;
}
