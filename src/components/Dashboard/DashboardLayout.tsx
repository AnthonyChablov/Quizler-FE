'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import SubHeader from '@/components/Common/SubHeader/SubHeader';
import Container from '@/components/Common/Container';
import DashBoardMenu from './DashBoardMenu/DashBoardMenu';
import { fetchData } from '@/api/quizData';
import SideDrawer from '../Common/SideDrawer/SideDrawer';
import { useSideDrawerStore } from '@/store/useSideDrawerStore';
import ScrollToTop from '../Common/Buttons/ScrollToTop';
import LoadingLayout from '../Loading/LoadingLayout';
import Hero from '../Common/Hero/Hero';
import Input from '@mui/material/Input';
import LatestQuizzes from './LatestQuizzes/LatestQuizzes';
import { useNotificationStore } from '@/store/useNotificationStore';
import Notification from '../Common/Notification/Notification';
import { DirectoryData } from '@/models/directories';
import DirectoryCard from './Cards/DirectoryCard';
import { API_BASE_URL } from '@/api/baseApiUrl';
import { readRootDirectory } from '@/api/directoryData';

const DashboardLayout = () => {
  const [searchKey, setSearchKey] = useState('');

  // Fetch quiz data from the API using useSWR
  // TODO: need to do query by the quizTitle, current just returns all quizzes
  const { data, error, isLoading } = useSWR(
    searchKey != ''
      ? `${API_BASE_URL}/quizzes?quizTitle=${searchKey}`
      : `${API_BASE_URL}/quizzes`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    },
  );

  // Fetch root directory data
  const {
    data: rootDirectoryData,
    error: rootDirectoryError,
    isLoading: rootDirectoryLoading,
  } = useSWR('rootDirectory', readRootDirectory, {
    revalidateOnFocus: false,
    refreshInterval: 700000,
  });
  const { isAddQuizSideDrawerOpen } = useSideDrawerStore();
  const { isNotificationOpen, toggleIsNotificationOpen } =
    useNotificationStore();

  useEffect(() => {
    console.log(rootDirectoryData);
  }, [rootDirectoryData]);

  if (rootDirectoryError) {
    return <p>Error: {rootDirectoryError.message}</p>;
  }
  if (rootDirectoryLoading) {
    return <LoadingLayout />;
  }
  return (
    <div className="h-full min-h-screen bg-slate-200 ">
      <Hero
        title="🚀 Test Your Knowledge!"
        description="🧠 
            Get ready to embark on an epic journey of discovery and learning."
      />
      <Container>
        <DashBoardMenu />
        {/* Display Directories */}
        <div className="pt-32 mb-6 sm:pt-28 flex items-center justify-between">
          <SubHeader text="Latest Directories" size="small" />
        </div>
        {/* Directories */}
        <div
          className="space-x-1 space-y-6  md:space-x-0 md:space-y-0 
        md:grid md:grid-cols-2 gap-6 lg:grid-cols-3 3xl:grid-cols-4 xl:gap-7"
        >
          {rootDirectoryData?.subdirectories?.map(
            (directory: DirectoryData, index: number) => {
              return (
                <React.Fragment key={index}>
                  <DirectoryCard
                    title={directory?.name}
                    linkTo={`/dashboard/explore/directory/${directory?._id}`}
                  />
                </React.Fragment>
              );
            },
          )}
        </div>
        <div className="pt-32 mb-6 sm:pt-28 flex items-center justify-between">
          {/* DIsplay laterst Quizzes */}
          <SubHeader text="Latest Quizzes" size="small" />
        </div>
        <LatestQuizzes quizzes={data} />
      </Container>
      <SideDrawer open={isAddQuizSideDrawerOpen} />
      <Notification />
      <ScrollToTop />
    </div>
  );
};

export default DashboardLayout;
