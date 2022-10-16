import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DehydratedState, Hydrate, QueryClientProvider } from '@tanstack/react-query'
import Seo from '../components/seo'
import queryClient from '../lib/react-query/query-client'
import NextNProgress from 'nextjs-progressbar'
import ErrorBoundary from '../components/error-boundary'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: DehydratedState
}>) {
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
      {process.env.NODE_ENV === 'development' ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  )
}

export default MyApp
