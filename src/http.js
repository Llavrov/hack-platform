export const auth = {
  get() {
    return {};
  },
};

function processRes(res, mapAnswer) {
  if (!res.ok) {
    let json;
    try {
      json = res.json().then((body) => {
        if (
          body?.message?.length &&
          body?.message !== "User has no team" &&
          body?.message !== "Access is denied" &&
          body?.message !== "Expired or invalid JWT token"
        ) {
          if (
            !window.location.href?.includes("register") &&
            !window.location.href?.includes("logIn")
          ) {
            window.root.spawnToast(body.message);
          }
        }
        return body;
      });
    } catch (ignore) {} // eslint-disable-line
    throw [res, json];
  }
  return mapAnswer ? mapAnswer(res) : res;
}

const mapAnswerDef = (res) => res.json();

export function mkFetch(
  method,
  url,
  additions,
  ct = "application/json",
  mapAnswer = mapAnswerDef
) {
  const rq = {
    method: method.toUpperCase(),
    cache: "no-cache",
    headers: {
      ...auth.get(),
    },
    redirect: "error",
    ...additions,
  };
  if (ct) {
    rq.headers["Content-Type"] = ct;
  }
  return fetch("/api" + url, rq).then((res) => processRes(res, mapAnswer));
}
export function get(url, params = null, mapAnswer = mapAnswerDef) {
  if (params) {
    const urlParams = new URLSearchParams();
    for (let it of Object.getOwnPropertyNames(params)) {
      urlParams.set(it, params[it]);
    }
    url += "?" + urlParams.toString();
  }
  return mkFetch("get", url, {}, "application/json", mapAnswer);
}
export function post(
  url,
  body = {},
  ct = "application/json",
  mapAnswer = mapAnswerDef
) {
  if (typeof body !== "string") {
    body = JSON.stringify(body);
  }
  return mkFetch("post", url, { body }, ct, mapAnswer);
}
export function postForm(url, body, mapAnswer = mapAnswerDef) {
  const realBody = new FormData();
  for (let it of Object.getOwnPropertyNames(body)) {
    realBody.append(it, body[it]);
  }
  return mkFetch(
    "post",
    url,
    {
      body: realBody,
    },
    null,
    mapAnswer
  );
}
export function put(
  url,
  body = {},
  ct = "application/json",
  mapAnswer = mapAnswerDef
) {
  if (typeof body !== "string") {
    body = JSON.stringify(body);
  }
  return mkFetch("put", url, { body }, ct, mapAnswer);
}
export function delete_(url, mapAnswer = mapAnswerDef) {
  return mkFetch("delete", url, {}, "application/json", mapAnswer);
}
