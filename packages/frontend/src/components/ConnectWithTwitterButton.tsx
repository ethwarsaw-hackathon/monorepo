import { Button } from "@mui/material";
import { apiFetch } from "../utils/apiFetch";

export function ConnectWithTwitterButton() {
    return (
        <Button variant="text" onClick={async () => {
            const { authUrl, state } = await (await apiFetch('/twitter-auth')).json();
            window.localStorage.setItem('state', state);
            window.open(authUrl);
        }}>Login with twitter</Button>
    )
}
