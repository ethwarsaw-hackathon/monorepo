

export function apiFetch(urlPath: string) {
    const state = window.localStorage.getItem('state')
    const params = state ? `?state=${state}`: '';
    return fetch(`http://localhost:4242${urlPath}${params}`);
}
