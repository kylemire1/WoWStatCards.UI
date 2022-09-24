import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  DehydratedState,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import Seo from "../components/seo";
import queryClient from "../lib/react-query/query-client";
import { ErrorBoundary } from "../components/error-boundary";
import NextNProgress from "nextjs-progressbar";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Hydrate state={pageProps.dehydratedState}>
          <Seo />
          <NextNProgress
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </Hydrate>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default MyApp;
