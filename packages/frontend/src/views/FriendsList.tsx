import React, { useEffect, useState } from "react";
import { FriendCard } from "../components/FriendCard";
import { apiFetch } from "../utils/apiFetch";


export function FriendsList() {
    // replace witht the call to the backeend
    const sampleFriends: Array<{ name: string; image: string }> = [
        {
            name: 'test',
            image: 'test'
        },
        {
            name: 'test',
            image: 'test'
        }
    ]
    const [users, setUsers] = useState<null | {
        name: string; image?: string
    }[]>();
    useEffect(() => {
        async function callback() {
            if (!users) {
                const response = await apiFetch('/twitter-friends');
                // TODO: this should be in a shared library between backend + frontend
                const users: {
                    usersResponse: Array<{
                        name: string; image?: string
                    }>
                } = await response.json();
                setUsers(users.usersResponse.slice(0, 5));
            }
        }
        callback()
    });

    console.log(users);

    return (
        <React.Fragment>
            {
                users ?
                    <React.Fragment>
                        {users.map((item) => {
                            return (
                                <FriendCard image={item.image || ''} name={item.name} />
                            )
                        })}
                    </React.Fragment>
                    :
                    'loading...'
            }
        </React.Fragment>
    )
}
