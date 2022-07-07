import { useQuery } from 'react-query';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import PictureItem from '../PictureItem';

import pictureRepository from 'repositories/PictureRepository';
import Picture from 'models/Picture';

const COLUMNS_PER_ROW = 4;
const WIDTH_OF_COLUMN = 216;

const PictureList: React.FC = () => {
  const { data } = useQuery<Picture[]>(
    'pictures',
    () => pictureRepository.findAll(0),
    {
      staleTime: 5000,
      cacheTime: Infinity,
    },
  );

  if (!data) {
    return null;
  }

  const pictureListElement: JSX.Element[] = data.map((picture, i) => {
    const xPos = (i % COLUMNS_PER_ROW) * WIDTH_OF_COLUMN;
    const yPos = data
      .slice(0, i + 1)
      .reverse()
      .reduce((acc, picture, j) => {
        if (j % COLUMNS_PER_ROW === 0 && j > 0) {
          acc += Number(picture.fixedWidth.height) + 32;
        }
        return acc;
      }, 0);

    return (
      <Wrapper
        key={picture.id}
        css={css`
          transform: translate3d(${xPos}px, ${yPos}px, 0px);
        `}
      >
        <PictureItem picture={picture} />
      </Wrapper>
    );
  });

  return <Container>{pictureListElement}</Container>;
};

const Container = styled.ul`
  position: relative;
  width: ${WIDTH_OF_COLUMN * COLUMNS_PER_ROW}px;
`;

const Wrapper = styled.li`
  height: fit-content;
  position: absolute;
  padding: 1rem 0.5rem;
  list-style: none;
`;

export default PictureList;
