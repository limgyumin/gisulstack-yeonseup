import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { PagePropsWithState } from 'types/react-query';
import { initializeApp } from 'libs/firebase';

type Props = PagePropsWithState<{}>;

const Home: NextPage<Props> = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  initializeApp();

  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
