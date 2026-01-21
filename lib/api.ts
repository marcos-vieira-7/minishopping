function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("accessToken");
}


export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
