export function post(url, body) {
  const myInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }
  if (body) myInit.body = JSON.stringify(body)

  return fetch(url, myInit)
    .then(response => response.json())
}
