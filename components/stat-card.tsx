import React from "react";

const StatCard = ({ children }: { children: React.ReactNode }) => (
  <div className='rounded-lg p-8 my-8 shadow-2xl shadow-slate-300'>
    {children}
  </div>
);
export default StatCard;
