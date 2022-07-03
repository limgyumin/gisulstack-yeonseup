class UrlParamBuilder {
  private url: string;

  constructor(url: string) {
    this.url = url + '?=';
  }

  attach(name: string, value: string | number | boolean): this {
    this.url = this.url + `&${name}=${value}`;

    return this;
  }

  get(): string {
    return this.url;
  }
}

export default UrlParamBuilder;
