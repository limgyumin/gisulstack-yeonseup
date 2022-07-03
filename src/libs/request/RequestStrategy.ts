export type RequestType = 'post' | 'get' | 'put' | 'delete';

interface RequestStrategy {
  request<T, D = unknown>(type: RequestType, url: string, data?: D): Promise<T>;
}

export default RequestStrategy;
