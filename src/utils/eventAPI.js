import tokenService from './tokenService'
const BASE_URL = '/api/events/';

function index() {
    return fetch(BASE_URL, getAuthRequestOptions('GET'))
    .then(res => {
        if (res.ok) return res.json();
        throw new Error ('Bad Credentials!');
    })
    .then(events => events);
}

/*--Helper Functions--*/
function getAuthRequestOptions(method) {
    return {
        method: method, 
        headers: new Headers({'Authorization': 'Bearer ' + tokenService.getToken()})
    };
}

function create(event) {
    return fetch(BASE_URL + `create`, {
        method: 'POST', 
        headers: new Headers({'Content-type': 'application/json'}),
        body: JSON.stringify(event)
    })
    .then(res => {
        if (res.ok) return res.json(); 
        throw new Error('Something went wrong!'); 
    })
}
function joinEvt(event, user) {    
        return fetch(BASE_URL + `${event._id}/join`, {
        method: 'POST', 
        headers: new Headers({'Content-type': 'application/json'}),
        body: JSON.stringify(tokenService.getUserFromToken())
    })
    .then(res => {
        if (res.ok) return res.json(); 
        throw new Error('Something went wrong!'); 
    })
}

export default {
    index, 
    create, 
    joinEvt
}