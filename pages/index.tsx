import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import styled from '@emotion/styled';

import { PagePropsWithState } from 'types/react-query';

import PictureList from 'components/pictures/PictureList';

import { initializeApp } from 'libs/firebase';

import pictureRepository from 'repositories/PictureRepository';

type Props = PagePropsWithState<{}>;

const Home: NextPage<Props> = () => {
  return (
    <Container>
      <PictureList />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
`;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  initializeApp();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('pictures', () =>
    pictureRepository.findAll(0),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Home;
