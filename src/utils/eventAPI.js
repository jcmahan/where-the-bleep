const BASE_URL = '/api/events/';

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
function join(event)     
//     return fetch(BASE_URL + `join`, {
//     method: 'POST', 
//     headers: new Headers({'Content-type': 'application/json'}),
//     body: JSON.stringify(event)
// })
// .then(res => {
//     if (res.ok) return res.json(); 
//     throw new Error('Something went wrong!'); 
// })

export default {
    create, 
    join
}