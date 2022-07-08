import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import styled from '@emotion/styled';

import PictureDetail from 'components/pictures/PictureDetail';

import { PICTURE_MODAL_WIDTH } from 'constants/pictures';

import { PagePropsWithState } from 'types/react-query';

import pictureRepository from 'repositories/PictureRepository';

type Props = PagePropsWithState<{}>;

const PictureDetailPage: NextPage<Props> = () => {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  return (
    <Container>
      <Wrapper>
        <Content>
          <PictureDetail pictureId={router.query.id as string} />
        </Content>
      </Wrapper>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('picture', () =>
    pictureRepository.findOneById(ctx.query.id as string),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: ${PICTURE_MODAL_WIDTH}px;
  padding: 5rem 0;
`;

const Content = styled.div`
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  -webkit-box-shadow: 0px 0px 64px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 64px 0px rgba(0, 0, 0, 0.15);
`;

export default PictureDetailPage;
