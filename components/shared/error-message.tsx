import React from "react";

type ErrorMessageProps = {
  error: unknown;
};
const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!(error instanceof Error)) return null;

  return (
    <div className='bg-red-100 p-3 rounded border border-red-800 text-red-800 font-semibold'>
      {error.message}
    </div>
  );
};

export default ErrorMessage;
