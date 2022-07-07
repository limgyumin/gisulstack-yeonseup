import { NextPage } from 'next';
import styled from '@emotion/styled';

import PictureList from 'components/pictures/PictureList';
import PictureDetailModal from 'components/pictures/PictureDetailModal';

const PicturesPage: NextPage = () => {
  return (
    <Container>
      <PictureList />
      <PictureDetailModal />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
`;

export default PicturesPage;
