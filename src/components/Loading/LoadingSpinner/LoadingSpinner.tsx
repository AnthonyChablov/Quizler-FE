import React from "react";
import { CircularProgress } from "@mui/material";

interface ILoadingSpinner {
  text: string;
}

const LoadingSpinner = ({ text }: ILoadingSpinner) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <CircularProgress color="secondary" size={35} />
      <p className="text-2xl text-purple-500 font-semibold mt-4">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
