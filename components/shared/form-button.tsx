import React from "react";

type FormButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const FormButton = ({ children, ...buttonProps }: FormButtonProps) => {
  return (
    <button
      type='submit'
      className='block w-full rounded border border-transparent bg-blue-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 sm:px-10'
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default FormButton;
