const api_key = "0986ce94-fa35-49b9-a7cc-a631322aa384";

export function getInfo() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + api_key,
    },
  };
  return fetch("https://inbdpa.api.hscc.bdpa.org/v1/info" ,requestOptions).then((data) => {
    return data.json();
  })
}
