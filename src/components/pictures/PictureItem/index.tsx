import Image from 'next/image';
import styled from '@emotion/styled';

import Picture from 'models/Picture';

type Props = {
  picture: Picture;
};

const PictureItem: React.FC<Props> = ({ picture }) => {
  const { fixed_width } = picture;

  return (
    <Container>
      <Image
        width={fixed_width.width}
        height={fixed_width.height}
        src={fixed_width.url}
        alt={fixed_width.url}
      />
    </Container>
  );
};

const Container = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
`;

export default PictureItem;
