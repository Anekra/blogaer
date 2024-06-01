import React, { useCallback } from 'react';
import { SlateEditor } from '../types';
import { Transforms } from 'slate';
import { WysiwygType } from '../enums';
import { convertFileToBase64 } from '../utils/helper';

export default function useImageUpload(editor: SlateEditor) {
  return useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { selection } = editor;
      if (!selection) return;

      const files = e.target.files;
      if (files?.length === 0) return;
      if (!files) return;
      const file = files[0];
      const fileName = file.name;
      const base64 = await convertFileToBase64(file);

      const img = new Image();
      img.src = base64;
      if (!img) return;
      img.onload = () => {
        Transforms.setNodes(editor, {
          type: WysiwygType.Image,
          children: [{ text: '' }],
          imageName: fileName,
          imageWidth: img.width,
          imageHeight: img.height,
          imageCaption: '',
          imageBase64: base64
        });
      };
    },
    [editor]
  );
}
