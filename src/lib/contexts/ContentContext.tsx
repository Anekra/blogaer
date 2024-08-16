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
import { INITIAL_VALUE } from '../utils/constants';
import { CustomElement } from '../slate';

type ContentContextType = [
  CustomElement[],
  Dispatch<SetStateAction<CustomElement[]>>
];

const ContentContext = createContext<ContentContextType>([[], () => {}]);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const initialValue = useMemo(() => INITIAL_VALUE, []);
  const [content, setContent] = useState<CustomElement[]>(initialValue);

  return (
    <ContentContext.Provider value={[content, setContent]}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
