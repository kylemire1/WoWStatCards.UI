import React from "react";
import "styles/globals.css";
import type { AppProps } from "next/app";
import {
  DehydratedState,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import Seo from "components/shared/seo";
import queryClient from "lib/react-query/query-client";
import NextNProgress from "nextjs-progressbar";
import ErrorBoundary from "components/shared/error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Seo />
        <ErrorBoundary>
          <NextNProgress
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />

          <Component {...pageProps} />
        </ErrorBoundary>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
