'use client'
import { useSession } from '@/lib/contexts/SessionContext';
import React from 'react';

export default function PostTest() {
  const { session } = useSession();
  return <p className="max-w-[500px] break-words">{JSON.stringify(session)}</p>;
}
