const API_URL = "http://127.0.0.1:8000/api/v1";

type SolveRequest = {
  cube: string;
};

type SolveResponse = {
  success: boolean;
  solution: string;
  moves: string[];
};

export async function solveCube(
  data: SolveRequest
): Promise<SolveResponse> {
  try {
    const response = await fetch(`${API_URL}/solve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Solve failed");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Solve API error");
  }
}