'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';
import { Descendant } from 'slate';
import { INITIAL_VALUE } from '../constants';

type ContentContextType = [
  Descendant[],
  Dispatch<SetStateAction<Descendant[]>>
];

const ContentContext = createContext<ContentContextType>([[], () => {}]);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const initialValue = useMemo(() => INITIAL_VALUE, []);
  const [content, setContent] = useState<Descendant[]>(initialValue);

  return (
    <ContentContext.Provider value={[content, setContent]}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
