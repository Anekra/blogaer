import { CommonDto } from '@/lib/types/dto/CommonDto';
import { PublishPost } from '@/lib/types/common';

export default async function postFetch(
  values: PublishPost,
  route: string
): Promise<CommonDto> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/${route}`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }
  );

  return await response.json();
}
