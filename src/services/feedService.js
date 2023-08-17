export function getArticles() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
    },
  };
  return fetch(
    "https://inbdpa.api.hscc.bdpa.org/v2/articles",
    requestOptions
  ).then((data) => data.json());
}
export function CreateArticle(title, contents, creator_id, keywords) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
    },
    body: JSON.stringify({
      title: title,
      contents: contents,
      creator_id: creator_id,
      keywords: [keywords]
    })
  };
  return fetch(
    "https://inbdpa.api.hscc.bdpa.org/v2/articles",
    requestOptions
  ).then((data) => data.json());
}