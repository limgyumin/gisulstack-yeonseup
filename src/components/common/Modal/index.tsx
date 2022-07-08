import { PropsWithChildren, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Portal from '../Portal';

type Props = PropsWithChildren<{
  width?: number;
  height?: number;
  open: boolean;
  onOverlayClick?: () => void;
}>;

const Modal: React.FC<Props> = ({
  width = 500,
  height = 300,
  open,
  children,
  onOverlayClick,
}) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  if (!open) return null;

  return (
    <Portal>
      <Container>
        <Wrapper>
          <Content
            css={css`
              width: ${width}px;
              min-height: ${height}px;
            `}
          >
            {children}
          </Content>
          <Overlay onClick={onOverlayClick} />
        </Wrapper>
      </Container>
    </Portal>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
`;

const Overlay = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: ${({ theme }) => theme.colors.dimBlack};
`;

const Content = styled.div`
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
  -webkit-box-shadow: 0px 0px 28px 1px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 28px 1px rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  overflow: hidden;
`;

export default Modal;
