import { useCallback } from 'react';
import styled from '@emotion/styled';

import PictureItem from '../PictureItem';

import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';
import usePictureListQuery from 'utils/hooks/usePictureListQuery';
import { deduplicate } from 'utils/deduplicate';

import Picture from 'models/Picture';

const COLUMNS_PER_ROW = 4;
const WIDTH_OF_COLUMN = 216;
const VERTICAL_SPACING_OF_ITEM = 32;

type PicturesWithPos = {
  picture: Picture;
  xPos: number;
  yPos: number;
};

const PictureList: React.FC = () => {
  const { data, hasNextPage, fetchNextPage } = usePictureListQuery();

  const duplicates =
    data?.pages.reduce(
      (acc, page) => acc.concat(page.pictures),
      [] as Picture[],
    ) ?? [];

  const [pictures, originalLength, shift] = deduplicate(duplicates, 'id');

  const handleIntersecting = useCallback(() => {
    if (hasNextPage) {
      const pageParam = originalLength - shift;

      fetchNextPage({ pageParam });
    }
  }, [hasNextPage, fetchNextPage, originalLength, shift]);

  const [ref] = useIntersectionObserver(handleIntersecting);

  if (!data) {
    return null;
  }

  const picturesWithPos: PicturesWithPos[] = pictures.map((picture, i) => {
    const xPos = (i % COLUMNS_PER_ROW) * WIDTH_OF_COLUMN;
    const yPos = pictures
      .slice(0, i + 1)
      .reverse()
      .reduce((acc, picture, j) => {
        if (j % COLUMNS_PER_ROW === 0 && j > 0) {
          acc += Number(picture.fixedWidth.height) + VERTICAL_SPACING_OF_ITEM;
        }
        return acc;
      }, 0);

    return { picture, xPos, yPos };
  });

  // find picture with a maximum y position.
  const maximum = picturesWithPos.reduce((prev, cur) =>
    prev.yPos > cur.yPos ? prev : cur,
  );

  // get the maximum height through the value with the maximum y position.
  const listHeight =
    maximum.yPos +
    Number(maximum.picture.fixedWidth.height) +
    VERTICAL_SPACING_OF_ITEM;

  return (
    <Container>
      <List css={{ height: `${listHeight}px` }}>
        {picturesWithPos.map(({ picture, xPos, yPos }) => (
          <Position
            key={picture.id}
            css={{ transform: `translate3d(${xPos}px, ${yPos}px, 0px)` }}
          >
            <PictureItem picture={picture} />
          </Position>
        ))}
      </List>
      <Bottom ref={ref} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${WIDTH_OF_COLUMN * COLUMNS_PER_ROW}px;
`;

const List = styled.ul`
  position: relative;
`;

const Position = styled.li`
  height: fit-content;
  position: absolute;
  padding: ${VERTICAL_SPACING_OF_ITEM / 16 / 2}rem 0.5rem;
  list-style: none;
`;

const Bottom = styled.div``;

export default PictureList;
