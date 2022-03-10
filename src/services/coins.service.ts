import { userService } from './services/user.service';

export default class coinService {
    retrieveUserWallet(){
        const requestOptions = {
            method: 'POST',
            headers: userService.authHeader
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
    getCurrentValue(){
        const requestOptions = {
            method: 'GET',
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


}