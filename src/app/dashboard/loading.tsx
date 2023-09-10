import React from "react";
import LoadingLayout from "@/components/Loading/LoadingLayout";

const loading = () => {
  return (
    <div>
      <LoadingLayout useCircularProgress={true} />
    </div>
  );
};

export default loading;
