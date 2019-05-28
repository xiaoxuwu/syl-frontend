import axios from '../AxiosClient';

export function authenticate(credentials) {
    return axios.post('/auth/', credentials)
}

export function isAuthenticated() {
    var token = localStorage.getItem('token')
    if (token !== undefined) {
        return token !== ''
    } else {
        return false
    }
}

export function setToken(res) {
    localStorage.setItem('token', res.data.token);
}

export function removeToken() {
    localStorage.setItem('token', '')
}

export function createUser(credentials) {
  axios.post('/users/create_account', credentials)
  return authenticate(credentials)
}
