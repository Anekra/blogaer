import { useCallback, useRef, useState } from 'react';
import { SlateEditor } from '../types';
import { BaseSelection } from 'slate';
import areEqual from 'deep-equal';

export default function useSelection(
  editor: SlateEditor
): [BaseSelection, BaseSelection, (newSelection: BaseSelection) => void] {
  const [selection, setSelection] = useState(editor.selection);
  const previousSelection = useRef<BaseSelection>(null);
  const setSelectionOptimized = useCallback(
    (newSelection: BaseSelection) => {
      if (areEqual(selection, newSelection)) return;
      previousSelection.current = selection;
      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [previousSelection.current, selection, setSelectionOptimized];
}
