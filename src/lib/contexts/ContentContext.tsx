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
import { CustomElement } from '../types/slate';

type ContentContextType = {
  content: CustomElement[];
  setContent: Dispatch<SetStateAction<CustomElement[]>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  isDoneEditing: boolean;
  setIsDoneEditing: Dispatch<SetStateAction<boolean>>;
};

const ContentContext = createContext<ContentContextType>({
  content: [],
  setContent: () => {},
  tags: [],
  setTags: () => {},
  isDoneEditing: true,
  setIsDoneEditing: () => {}
});

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const initialValue = useMemo(() => INITIAL_VALUE, []);
  const [content, setContent] = useState<CustomElement[]>(initialValue);
  const [tags, setTags] = useState<string[]>([]);
  const [isDoneEditing, setIsDoneEditing] = useState<boolean>(true);

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        tags,
        setTags,
        isDoneEditing,
        setIsDoneEditing
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
