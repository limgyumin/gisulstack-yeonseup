import { useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from 'components/common/Button';
import GiphyIcon from 'components/common/icons/GiphyIcon';

import { PICTURE_MODAL_HEIGHT, PICTURE_MODAL_WIDTH } from 'constants/pictures';

import usePictureDetailQuery from 'utils/hooks/usePictureDetailQuery';

type Props = {
  pictureId: string;
};

const PictureDetail: React.FC<Props> = ({ pictureId }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const { isLoading, data } = usePictureDetailQuery(pictureId);

  const handleLoadingComplete = () => setLoading(false);

  if (isLoading) {
    // need loading component
    return <div></div>;
  }

  if (data == null) {
    // need empty component
    return <div></div>;
  }

  const { username, title, url, original } = data;

  const height =
    (Number(original.height) * (PICTURE_MODAL_WIDTH / 2)) /
    Number(original.width);

  const isFullHeight = height >= PICTURE_MODAL_HEIGHT;

  return (
    <Container>
      <ImageArea
        css={css`
          padding: ${isFullHeight ? '0rem' : '1.25rem'};
        `}
      >
        <ImageWrapper
          css={css`
            overflow: hidden;
            border-radius: ${isFullHeight ? '0rem' : '1rem'};
          `}
        >
          <Image
            src={original.url}
            alt={original.url}
            width={original.width}
            height={original.height}
            layout="responsive"
            hidden={loading}
            onLoadingComplete={handleLoadingComplete}
          />
        </ImageWrapper>
      </ImageArea>

      <ContentArea>
        {username && <Username>{username}</Username>}

        <Title>{title}</Title>

        <ButtonArea>
          <GiphyButton as="a" href={url} target="_blank" full>
            <GiphyIcon />
            <ButtonContent>
              See in <span>GIPHY</span>
            </ButtonContent>
          </GiphyButton>
        </ButtonArea>
      </ContentArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const ImageWrapper = styled.div``;

const ImageArea = styled.div`
  width: 50%;
`;

const ContentArea = styled.div`
  width: 50%;
  padding: 1.25rem;
`;

const ButtonArea = styled.div`
  margin-top: 1.5rem;
`;

const Username = styled.p`
  color: ${({ theme }) => theme.colors.ftGray400};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.ftBlack};
  font-size: 1.75rem;
  font-weight: 700;
`;

const GiphyButton = styled(Button)`
  text-decoration: none;
  gap: 0.5rem;
  background-color: #121212;
  font-weight: 700;

  &:hover {
    background-color: #353535;
  }
`;

const ButtonContent = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.ftWhite};

  & > span {
    font-weight: 700;
  }
`;

export default PictureDetail;
