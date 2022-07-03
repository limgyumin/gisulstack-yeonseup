import { createAxiosInstance } from 'libs/axios';
import AxiosRequestStrategy from 'libs/request/AxiosRequestStrategy';
import RequestStrategy from 'libs/request/RequestStrategy';
import UrlParamBuilder from 'libs/request/UrlParamBuilder';

import Picture, { PictureAttributes } from 'models/Picture';

type Pagination = {
  count: number;
  offset: number;
  total_count: number;
};

type FetchPicturesResponse = {
  data: PictureAttributes[];
  pagination: Pagination;
};

const PICTURES_PER_REQUEST = 30;

class PictureRepository {
  constructor(private readonly requestStrategy: RequestStrategy) {}

  async findAll(
    offset: number,
    limit = PICTURES_PER_REQUEST,
  ): Promise<Picture[]> {
    const url = new UrlParamBuilder('/gifs/trending')
      .attach('offset', offset)
      .attach('limit', limit)
      .get();

    const { data } = await this.requestStrategy.request<FetchPicturesResponse>(
      'get',
      url,
    );

    return data.map(Picture.createInstance);
  }
}

const instance = createAxiosInstance();

const pictureRepository = new PictureRepository(
  new AxiosRequestStrategy(instance),
);

export default pictureRepository;
