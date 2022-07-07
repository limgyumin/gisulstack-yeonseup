import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Picture from 'models/Picture';

type Props = {
  picture: Picture;
};

const PictureItem: React.FC<Props> = ({ picture }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const { id, fixedWidth } = picture;

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

export default PictureItem;
