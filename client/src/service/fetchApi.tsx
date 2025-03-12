import { User } from "../type";

// If your response contains different structure, such as a simple list or object


export const fetchApi = async (
  url: string,
  method: string = "GET", // Default method is GET
  payload?: User
): Promise<User | User[]> => {
  const headers = { "Content-Type": "application/json" };

  // Prepare body only if method requires it (i.e., not GET or DELETE)
  const body =
    method !== "GET" && method !== "DELETE" && payload
      ? JSON.stringify(payload)
      : undefined;

  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });

    // Check for response status and parse JSON using response.json()
    const responseJson = await response.json();

    console.log("Response status:", response.status);
    console.log("Response body:", responseJson);

    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    // Return the parsed JSON response
    return responseJson;
  } catch (error) {
    // Log error in case of network issues or other unexpected issues
    throw new Error(`Error in fetch: ${error}`);
  }
};
