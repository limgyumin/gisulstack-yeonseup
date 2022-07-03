import { useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';

import PictureItem from '../PictureItem';

import pictureRepository from 'repositories/PictureRepository';

const COLUMNS_PER_ROW = 4;
const WIDTH_OF_COLUMN = 216;

const PictureList: React.FC = () => {
  const { data } = useQuery('pictures', () => pictureRepository.findAll(0));

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
          acc += Number(picture.fixed_width.height) + 32;
        }
        return acc;
      }, 0);

    return (
      <Wrapper key={picture.id} xPos={xPos} yPos={yPos}>
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

const Wrapper = styled.li<{ xPos: number; yPos: number }>`
  height: fit-content;
  position: absolute;
  padding: 1rem 0.5rem;
  list-style: none;

  ${({ xPos, yPos }) => css`
    transform: translate3d(${xPos}px, ${yPos}px, 0px);
  `}
`;

export default PictureList;
