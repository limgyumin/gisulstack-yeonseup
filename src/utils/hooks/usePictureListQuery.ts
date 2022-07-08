import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import pictureRepository, {
  PicturesWithPagination,
} from 'repositories/PictureRepository';

type Return = UseInfiniteQueryResult<PicturesWithPagination, unknown>;

const usePictureListQuery = (): Return => {
  const fetchPictureList = ({ pageParam = 0 }) =>
    pictureRepository.findAll(pageParam);

  const query = useInfiniteQuery<PicturesWithPagination>(
    ['pictures'],
    fetchPictureList,
    {
      getNextPageParam: ({ next, totalCount }) => {
        return next < totalCount ? next : null;
      },
      refetchOnWindowFocus: false,
    },
  );

  return query;
};

export default usePictureListQuery;
