import { css } from '@emotion/react';

export const ellipsis = (lineCount: number) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${lineCount};
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
