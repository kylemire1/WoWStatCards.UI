import React from "react";
import {
  ErrorBoundary as ReactBoundary,
  FallbackProps,
} from "react-error-boundary";

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactBoundary FallbackComponent={ErrorFallback}>{children}</ReactBoundary>
  );
};

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
