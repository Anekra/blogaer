export default async function getPostsByUserId(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}
