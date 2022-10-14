import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DehydratedState, Hydrate, QueryClientProvider } from '@tanstack/react-query'
import Seo from '../components/seo'
import queryClient from '../lib/react-query/query-client'
import NextNProgress from 'nextjs-progressbar'
import ErrorBoundary from '../components/error-boundary'
import { SessionProvider, useSession } from 'next-auth/react'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: DehydratedState
  session: ReturnType<typeof useSession>
}>) {
  return (
    <SessionProvider>
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
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
