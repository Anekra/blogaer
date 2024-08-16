import { PostTitle } from '@/lib/types/PostTitle';
import { PublishPost } from '@/lib/types/common';

export default async function addPost(values: PublishPost): Promise<PostTitle> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/post`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
  const postResponse = await response.json();

  if (!response.ok) throw response;

  return postResponse;
}
