import type { Resource } from "../types/types";

export const fetchData = async (
  resource: Resource,
  page: number = 1
): Promise<{ results: any[]; info: { next: string | null } }> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api${resource}?page=${page}`
  );
  if (!response.ok) throw new Error("Network error");
  return response.json();
};
