import React, { ReactNode } from "react";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";
import Container from "../Common/Container";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingLayout = () => {
  return (
    <>
      <LinearProgress color="secondary" className="w-full fixed top-0" />
      <div className="bg-slate-200 min-h-screen flex flex-col items-center justify-center">
        <Container>
          <div className="p-4 md:flex md:justify-between md:space-x-4 lg:space-x-8">
            <div className="flex items-center justify-center flex-col">
              <CircularProgress color="secondary" size={35} />
              <p className="text-2xl text-purple-500 font-semibold mt-4">
                Loading
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default LoadingLayout;
