const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7164/api";

export async function request(path, options = {}) {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const data = response.status === 204
    ? null
    : contentType.includes("application/json")
      ? await response.json()
      : await response.text();

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-expired"));
    throw new Error("Oturum süren doldu. Lütfen tekrar giriş yap.");
  }

  if (!response.ok) {
    const validation = data?.errors
      ? Object.values(data.errors).flat().join(" ")
      : null;
    throw new Error(validation || data?.message || data || `İstek başarısız (${response.status}).`);
  }
  return data;
}

const json = (method, body) => ({ method, body: JSON.stringify(body) });

export const login = (email, password) => request("/Auth/login", json("POST", { email, password }));
export const register = (fullName, email, password) => request("/Auth/register", json("POST", { fullName, email, password }));
export const getTransactions = () => request("/Transaction/list");
export const createTransaction = (value) => request("/Transaction/create", json("POST", value));
export const updateTransaction = (id, value) => request(`/Transaction/update/${id}`, json("PUT", value));
export const deleteTransaction = (id) => request(`/Transaction/delete/${id}`, { method: "DELETE" });
export const getCategories = () => request("/Category/list");
export const createCategory = (value) => request("/Category/create", json("POST", value));
export const updateCategory = (id, value) => request(`/Category/update/${id}`, json("PUT", value));
export const deleteCategory = (id) => request(`/Category/delete/${id}`, { method: "DELETE" });
