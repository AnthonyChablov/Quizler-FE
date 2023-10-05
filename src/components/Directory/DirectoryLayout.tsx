"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { fetchData } from "@/api/quizData";
import { useParams, useRouter, usePathname } from "next/navigation";
import LoadingLayout from "../Loading/LoadingLayout";
import Container from "../Common/Container";
import iconFolder from "../../../public/icon _folder_.png";
import Image from "next/image";

const DirectoryLayout = () => {
  const router = useRouter();
  const params = useParams();
  const directoryId = params.directory.toString();
  const pathname = usePathname();

  // Fetch Directories
  const {
    data: directoryData,
    error: directoryError,
    isLoading: directoryLoading,
  } = useSWR(
    `https://quizzlerreactapp.onrender.com/api/directory/${directoryId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  useEffect(() => {
    console.log(directoryData);
  }, [directoryData]);

  if (directoryLoading) {
    return <LoadingLayout />;
  }

  if (directoryError) {
    return <div>Error loading directory: {directoryError.message}</div>;
  }

  if (!directoryData) {
    return null; // Render nothing until data is available
  }

  return (
    <div className="h-full min-h-screen bg-slate-200 ">
      <Container>
        <div className="pt-10 flex h-fit items-center">
          <Image src={iconFolder} width={25} height={25} alt="folder icon" />
          <h1 className="text-3xl text-black font-semibold ml-5">
            {directoryData.directory.name}
          </h1>
        </div>
      </Container>
    </div>
  );
};

export default DirectoryLayout;
