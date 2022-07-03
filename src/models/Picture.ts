type Image = {
  width: string;
  height: string;
  url: string;
};

type Images = {
  original: Image;
  fixed_width: Image;
};

export type PictureAttributes = Readonly<{
  id: string;
  url: string;
  title: string;
  images: Images;
}>;

class Picture {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly original: Image;
  readonly fixed_width: Image;

  constructor(picture: PictureAttributes) {
    this.id = picture.id;
    this.url = picture.url;
    this.title = picture.title;
    this.original = picture.images.original;
    this.fixed_width = picture.images.fixed_width;
  }

  static createInstance(picture: PictureAttributes): Picture {
    return new Picture(picture);
  }
}

export default Picture;
