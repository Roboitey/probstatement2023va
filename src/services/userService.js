export function getUser(Username) {
  const requestOptions = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
    },
  };
  return fetch(
    "https://inbdpa.api.hscc.bdpa.org/v1/users/" + Username,
    requestOptions
  ).then((data) => data.json());
}
export function UserEdit(
  user_id,
  about,
  Experience,
  Education,
  Volunteering,
  Skills
) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
    },
    body: JSON.stringify({
      sections: {
        about: about,
        experience: Experience,
        education: Education,
        volunteering: Volunteering,
        skills: Skills,
      },
    }),
  };
  return fetch(
    "https://inbdpa.api.hscc.bdpa.org/v1/users/" + user_id,
    requestOptions
  ).then((data) => data.json());
}

export function addConnection(user_id, connection_id) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
    },
  };
  return fetch(
    "https://inbdpa.api.hscc.bdpa.org/v1/users/" +
      user_id +
      "/connections/" +
      connection_id,
    requestOptions
  ).then((data) => data.json());
}

export function deleteConnection(user_id, connection_id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
    },
  };
  return fetch(
    "https://inbdpa.api.hscc.bdpa.org/v1/users/" +
      user_id +
      "/connections" +
      connection_id,
    requestOptions
  ).then((data) => data.json());
}
