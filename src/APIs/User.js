import axios from 'axios';
export async function registerUser(email, password, rememberMe) {
  return axios.post('/api/auth/register-user', {
    email,
    password,
    rememberMe,
  });
}
// get users email==>used in verification page
export async function getUserEmail(crypto) {
  return axios.post('/api/auth/get-user-email', {
    crypto: crypto,
  });
}

// verify account
export async function verifyUser(cryptoCode, code) {
  return axios.post(`/api/auth/verify-user`, {
    cryptoCode,
    code,
  });
}

// login user

export async function loginUser(email, password, rememberMe) {
  return axios.post('/api/auth/login-user', {
    email,
    password,
    rememberMe,
  });
}

// logout user
export async function logoutUser() {
  return axios.post('/api/auth/logout-user', {}, { withCredentials: true });
}

// logout user
export async function fetchPublicServices() {
  return axios.get('/api/public/services/fetch-services');
}
