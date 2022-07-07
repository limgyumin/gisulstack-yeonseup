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
  username?: string;
  title: string;
  images: Images;
}>;

class Picture {
  readonly id: string;
  readonly url: string;
  readonly username?: string;
  readonly title: string;
  readonly original: Image;
  readonly fixedWidth: Image;

  constructor(picture: PictureAttributes) {
    this.id = picture.id;
    this.url = picture.url;
    this.username = picture.username;
    this.title = picture.title;
    this.original = picture.images.original;
    this.fixedWidth = picture.images.fixed_width;
  }

  static createInstance(picture: PictureAttributes): Picture {
    return new Picture(picture);
  }
}

export default Picture;
