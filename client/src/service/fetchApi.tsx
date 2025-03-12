export const fetchApi = async <T,>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  payload?: unknown
): Promise<T> => {
  const headers = { "Content-Type": "application/json" };

  const body =
    method !== "GET" && method !== "DELETE" && payload
      ? JSON.stringify(payload)
      : undefined;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json() as Promise<T>; // Ensure TypeScript knows the response type
  } catch (error) {
    throw new Error(`Error in fetch: ${error}`);
  }
};
