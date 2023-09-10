import React, { ReactNode } from "react";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";
import Container from "../Common/Container";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingLayoutProps {
  useCircularProgress: boolean;
  children?: ReactNode;
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({
  useCircularProgress,
}) => {
  return (
    <div className="bg-slate-200 min-h-screen mt-20">
      <Container>
        <div className="p-4 md:flex md:justify-between md:space-x-4 lg:space-x-8">
          {useCircularProgress ? (
            <div className="flex items-center justify-center">
              <CircularProgress />
            </div>
          ) : (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LoadingLayout;
