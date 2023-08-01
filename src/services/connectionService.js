const api_key = "0986ce94-fa35-49b9-a7cc-a631322aa384";
const MAX_ORDER = 4;

async function getConnections(user_id) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + api_key,
    },
  };
  const data = await fetch(
    "https://inbdpa.api.hscc.bdpa.org/v1/users/" + user_id + "/connections",
    requestOptions
  );
  return data.json();
  // const connections = await data.json();
  // storeConnections(user_id, connections.connections);
  // return connections;
}

export async function createConnections(user_id) {
  let unvisited = [
    {
      user_id,
      order: 0,
    },
  ];
  let visited = [user_id];
  const connects = [];
  let order = 0;
  while (unvisited.length > 0 && order <= MAX_ORDER) {
    const popped = unvisited[0];
    connects.push(popped);
    visited.push(popped.user_id);
    unvisited = unvisited.slice(1);
    order = popped["order"] + 1;
    const id = popped["user_id"];
    const data = await getConnections(id);
    // eslint-disable-next-line no-loop-func
    await data["connections"].forEach((connection) => {
      if (!visited.includes(connection)) {
        //+-console.log(connection);
        unvisited.push({
          user_id: connection,
          order,
        });
      }
    });
  }
  //storeConnections(user_id, connects);
  return connects;
}

function storeConnections(user_id, connections) {
  localStorage.setItem(
    "connections",
    JSON.stringify({
      ...localStorage.getItem("connections"),
      [user_id]: connections,
    })
  );
}
