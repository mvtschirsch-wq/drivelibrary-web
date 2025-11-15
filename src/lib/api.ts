const BASE = import.meta.env.VITE_API_BASE;

export async function fetchLibrary() {
  const res = await fetch(`${BASE}/library`);
  return res.json();
}

export async function patchItem(id: string, data: any) {
  const res = await fetch(`${BASE}/library/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function syncNow() {
  const res = await fetch(`${BASE}/scan`, { method: "POST" });
  return res.json();
}

export function authUrl() {
  return `${BASE}/oauth2/start`;
}

export function exportCsvUrl() {
  return `${BASE}/export.csv`;
}
