
export function apiFetch(urlPath: string) {
    const state = window.localStorage.getItem('state')
    const stateParams = state ? `state=${state}` : '';
    const params = urlPath.includes('?') ? `&${stateParams}` : `?${stateParams}`;

    return fetch(`http://localhost:4242${urlPath}${params}`);
}
