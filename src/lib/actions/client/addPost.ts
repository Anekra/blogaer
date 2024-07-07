import { PublishPost } from "@/lib/types";

export default async function publishPost(values: PublishPost, token?: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(values)
  });
  const postResponse = await response.json()

  if (!response.ok) throw response

  return postResponse
}
