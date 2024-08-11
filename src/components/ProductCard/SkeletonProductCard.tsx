import React from "react";

const SkeletonProductCard = () => {
  return (
    // Skeleton de carga
    <div className="animate-pulse bg-white shadow-md rounded-md overflow-hidden p-3 h-22rem">
      <div className="w-full h-48 bg-gray-200 mb-4"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="flex justify-between items-center">
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="w-9 h-9 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
