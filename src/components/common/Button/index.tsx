import { ComponentPropsWithRef, ElementType, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type ButtonProps<T extends ElementType = 'button'> =
  ComponentPropsWithRef<T> &
    PropsWithChildren<{
      as?: T;
      full?: boolean;
    }>;

function Button<T extends ElementType = 'button'>({
  as,
  full = false,
  children,
  ...rest
}: ButtonProps<T>) {
  return (
    <Container
      {...rest}
      as={as ?? 'button'}
      css={css`
        width: ${full ? '100%' : 'auto'};
      `}
    >
      {children}
    </Container>
  );
}

Button.displayName = 'Button';

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.125rem;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color ease 0.1s;
  cursor: pointer;
`;

export default Button;
