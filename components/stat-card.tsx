import React from "react";

const StatCard = ({ children }: { children: React.ReactNode }) => (
  <div className='bg-slate-900 overflow-hidden aspect-video rounded-lg p-8 my-8 shadow-2xl shadow-slate-300 relative'>
    {children}
  </div>
);
export default StatCard;
