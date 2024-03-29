export function getProfile(id){
    const requestOptions = {
        method: "GET", 
        headers: {
            Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
            'content-type': "application/json"
        }
    }
    return fetch("https://inbdpa.api.hscc.bdpa.org/v2/users/" + id, requestOptions).then((res)=>(
        (res.json())
    ))
}

export function DeleteUser(id){
    const requestOptions = {
        method: "DELETE", 
        headers: {
            Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
            'content-type': "application/json"
        }
    }
    return fetch("https://inbdpa.api.hscc.bdpa.org/v2/users/" + id, requestOptions).then((res)=>(
        (res.json())
    ))
}