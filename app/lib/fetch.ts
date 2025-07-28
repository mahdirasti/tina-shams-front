import { _VARZ } from "@/app/const/_varz";

const BASE_URL = _VARZ.apiUrl;

export async function fetchData<T = any>(
  endpoint: string,
  options: RequestInit = {}
) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        // "x-key": API_KEY,
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
