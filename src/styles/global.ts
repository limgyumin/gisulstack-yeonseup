import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  img {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  select {
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'Interop';
  }

  div {
    line-height: 0;
  }

  #root {
    height: 100%;
  }
`;
