import React from 'react'

const ErrorAlert = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='text-red-700 bg-red-100 border-red-200 border rounded-md p-2 mt-4'>
      {children}
    </div>
  )
}

export default ErrorAlert
