import React from "react";

const LoadingSkeleton = () => {
 
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-64 h-80 bg-gray-200 rounded-2xl shadow-md overflow-hidden"
        >
          
          <div className="h-40 bg-gray-300"></div>

          
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-10 bg-gray-300 rounded mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;