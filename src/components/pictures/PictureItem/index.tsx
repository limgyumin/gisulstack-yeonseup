import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Picture from 'models/Picture';

import { ellipsis } from 'styles/utils';

type Props = {
  picture: Picture;
};

const PictureItem: React.FC<Props> = ({ picture }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const { id, username, title, fixedWidth } = picture;

  const handleLoadingComplete = () => setLoading(false);

  return (
    <Link href={`/pictures?id=${id}`} as={`/pictures/${id}`} scroll={false}>
      <Container
        css={css`
          width: ${fixedWidth.width}px;
          height: ${fixedWidth.height}px;
        `}
      >
        {loading && <ImageSkeleton />}

        <Content>
          <Username>{username}</Username>
          <Title>{title}</Title>
        </Content>

        <Image
          src={fixedWidth.url}
          alt={fixedWidth.url}
          layout="fill"
          hidden={loading}
          onLoadingComplete={handleLoadingComplete}
        />
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: block;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
`;

const ImageSkeleton = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const Content = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 0.875rem;
  background-color: ${({ theme }) => theme.colors.dimBlack};
  opacity: 0;
  transition: opacity ease 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Username = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  word-break: break-all;
  ${ellipsis(1)}
`;

export default PictureItem;
