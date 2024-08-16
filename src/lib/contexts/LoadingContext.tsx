'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (_: boolean) => {}
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const setLoading = (loading: boolean) => setIsLoading(loading);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
