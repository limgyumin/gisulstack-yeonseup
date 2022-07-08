import { createAxiosInstance } from 'libs/axios';
import AxiosRequestStrategy from 'libs/request/AxiosRequestStrategy';
import RequestStrategy from 'libs/request/RequestStrategy';
import UrlParamBuilder from 'libs/request/UrlParamBuilder';

import Picture, { PictureAttributes } from 'models/Picture';

import { PICTURES_PER_REQUEST } from 'constants/pictures';

type Pagination = {
  count: number;
  offset: number;
  total_count: number;
};

type FindAllPicturesResponse = {
  data: PictureAttributes[];
  pagination: Pagination;
};

type FindPictureResponse = {
  data: PictureAttributes;
};

export type PicturesWithPagination = {
  pictures: Picture[];
  next: number;
  totalCount: number;
};

class PictureRepository {
  constructor(private readonly requestStrategy: RequestStrategy) {}

  async findOneById(id: string): Promise<Picture> {
    const { data } = await this.requestStrategy.request<FindPictureResponse>(
      'get',
      `/gifs/${id}`,
    );

    return Picture.createInstance(data);
  }

  async findAll(
    offset: number = 0,
    limit = PICTURES_PER_REQUEST,
  ): Promise<PicturesWithPagination> {
    const url = new UrlParamBuilder('/gifs/trending')
      .attach('offset', offset)
      .attach('limit', limit)
      .get();

    const { data, pagination } =
      await this.requestStrategy.request<FindAllPicturesResponse>('get', url);

    const pictures = data.map(Picture.createInstance);

    return {
      pictures,
      next: pagination.offset + PICTURES_PER_REQUEST,
      totalCount: pagination.total_count,
    };
  }
}

const instance = createAxiosInstance();

const pictureRepository = new PictureRepository(
  new AxiosRequestStrategy(instance),
);

export default pictureRepository;
