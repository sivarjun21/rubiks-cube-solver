const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function scanCube(data: any) {
  const response = await fetch(`${API_BASE_URL}/scan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to scan cube");
  }

  return response.json();
}