export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err + 'in Register'));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.message !== 'Incorrect email address or password') {
                localStorage.setItem('token', data.token);
                return data;
            } else {
                return data;
            }
        })
        .catch((err) => console.log(err));
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => data);
};
