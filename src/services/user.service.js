export const userService = {
    login,
    logout
};

function authHeader() {
    // return authorization header with basic auth credentials
    const user = JSON.parse(localStorage.getItem('user') || "");

    if ((user!="") && (user.authdata)) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                // not the most secure but it works for now
                user.authdata = Buffer.from(username + ':' + password, 'base64');
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
