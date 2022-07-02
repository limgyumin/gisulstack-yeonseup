import { DehydratedState } from 'react-query';

export type ServerSideState = {
  dehydratedState: DehydratedState;
};

export type PagePropsWithState<T> = T & ServerSideState;
