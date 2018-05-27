import userAPI from '../utils/userAPI';
import tokenService from '../utils/tokenService';

function signup(user) {
    return userAPI.signup(user)
    .then(token => tokenService.setToken(token));
}
function getUser() {
    return tokenService.getUserFromToken();
}
function logout() {
    tokenService.removeToken();
}
export default {
    signup, 
    getUser,
    logout
}