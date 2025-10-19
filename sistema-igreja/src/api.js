const BASE_URL = "http://localhost:3001";

export async function get(route) {
  const res = await fetch(`${BASE_URL}/${route}`);
  return res.json();
}

export async function post(route, data) {
  const res = await fetch(`${BASE_URL}/${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
