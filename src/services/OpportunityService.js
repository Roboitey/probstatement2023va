export function getOpportunity(){
    const requestOptions = {
        method: "get", 
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384"
        }
    }
    return fetch ("https://inbdpa.api.hscc.bdpa.org/v2/opportunities" , requestOptions)
        .then(data => data.json())
}