const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const fetcher = async (url: string) => {
  const res = await fetch(`${API_URL}${url}`);
  if (!res.ok) {
    throw new Error('Error fetching data');
  }
  return await res.json();
};
