import { Button } from "@mui/material";
import { apiFetch } from "../utils/apiFetch";

export function ConnectWithTwitterButton(props: Props) {
    return (
        <Button variant="text" onClick={async () => {
            const { authUrl, state } = await (await apiFetch(`/twitter-auth?accountAddress=${props.accountAddress}`)).json();
            window.localStorage.setItem('state', state);
            window.open(authUrl, "_self")
        }}>Login with twitter</Button>
    )
}

interface Props {
    accountAddress: string;
}
