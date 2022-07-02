import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { Global, ThemeProvider } from '@emotion/react';

import '../public/fonts/style.css';

import { globalStyles } from 'styles/global';
import { theme } from 'styles/theme';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
