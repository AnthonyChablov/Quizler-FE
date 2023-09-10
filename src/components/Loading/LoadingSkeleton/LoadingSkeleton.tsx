import React from "react";
import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="md:flex md:flex-col w-full">
      {/* Text Skeleton */}
      <div className="mb-4 md:mb-6">
        <Skeleton
          variant="text"
          animation="wave"
          width={100}
          height={24}
          style={{ borderRadius: "4px", marginBottom: "8px" }}
        />
      </div>
      {/* Rectangular Skeleton */}
      <div style={{ marginTop: "16px" }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={200}
          style={{ borderRadius: "8px" }}
        />
      </div>

      {/* Another Text Skeleton */}
      <div style={{ marginTop: "16px" }}>
        <Skeleton
          variant="text"
          animation="wave"
          height={24}
          style={{ borderRadius: "4px" }}
        />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
