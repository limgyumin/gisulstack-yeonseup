import Picture from 'models/Picture';
import { useQuery, UseQueryResult } from 'react-query';
import pictureRepository from 'repositories/PictureRepository';

type Return = UseQueryResult<Picture, unknown>;

const usePictureDetailQuery = (pictureId: string): Return => {
  const fetchPictureDetail = () => pictureRepository.findOneById(pictureId);

  const query = useQuery<Picture>('picture', fetchPictureDetail, {
    refetchOnWindowFocus: false,
  });

  return query;
};

export default usePictureDetailQuery;
