import React from "react";

const SvgBackground = () => {
  return (
    <div
      aria-hidden='true'
      className='absolute inset-0 -mt-72 sm:-mt-32 md:mt-0'
    >
      <svg
        className='absolute inset-0 h-full w-full'
        preserveAspectRatio='xMidYMid slice'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 1463 360'
      >
        <path
          className='text-blue-400 text-opacity-40'
          fill='currentColor'
          d='M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z'
        />
        <path
          className='text-blue-600 text-opacity-40'
          fill='currentColor'
          d='M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z'
        />
      </svg>
    </div>
  );
};

export default SvgBackground;
