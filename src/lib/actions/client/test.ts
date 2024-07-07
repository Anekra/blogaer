export default async function test(token?: string) {  
  await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/test`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
