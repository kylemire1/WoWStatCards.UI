import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  labelFor?: string;
  labelClassName?: string;
  theme?: "light" | "dark";
};
const Input = ({
  labelClassName,
  label,
  labelFor,
  theme = "dark",
  ...inputProps
}: InputProps) => {
  return (
    <div className='block w-full text-ba'>
      <label
        className='sr-only'
        htmlFor={labelFor ?? inputProps?.id ?? inputProps?.name}
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={inputProps?.id ?? inputProps?.name}
        placeholder={inputProps?.placeholder ?? label}
        className={
          theme === "dark"
            ? `block w-full rounded border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 ${
                inputProps?.className ?? ""
              }`
            : `rounded w-full focus:ring-offset-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-white ${
                inputProps.className ?? ""
              }`
        }
      />
    </div>
  );
};

export default Input;
