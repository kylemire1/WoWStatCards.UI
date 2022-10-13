import React, { ErrorInfo } from "react";
import { OnlyChildren } from "lib/types";
import { Layout } from "./layout";

type ErrorBoundaryProps = OnlyChildren;
type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.warn({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Layout>
          <Layout.Container>
            <h1 className='font-bold text-4xl mb-4'>Oops!</h1>
            <p>There was an error.</p>
            <button
              type='button'
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button>
          </Layout.Container>
        </Layout>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
