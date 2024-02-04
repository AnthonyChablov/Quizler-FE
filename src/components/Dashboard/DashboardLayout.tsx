'use client';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import SubHeader from '@/components/Common/SubHeader/SubHeader';
import Container from '@/components/Common/Container';
import DashBoardMenu from './DashBoardMenu/DashBoardMenu';
import SideDrawer from '../Common/SideDrawer/SideDrawer';
import { useSideDrawerStore } from '@/store/useSideDrawerStore';
import ScrollToTop from '../Common/Buttons/ScrollToTop';
import LoadingLayout from '../Loading/LoadingLayout';
import Hero from '../Common/Hero/Hero';
import LatestQuizzes from './LatestQuizzes/LatestQuizzes';
import { DirectoryData } from '@/models/directories';
import DirectoryCard from './Cards/DirectoryCard';
import { readRootDirectory } from '@/api/directoryData';

const DashboardLayout = () => {
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
    <div className="h-full min-h-screen bg-slate-200">
      <Hero
        title="🚀 Test Your Knowledge!"
        description="🧠 Get ready to embark on an epic journey of discovery and learning."
      />
      <Container>
        <DashBoardMenu />
        {/* Display Directories */}
        <div className="pt-32 mb-6 sm:pt-28 flex items-center justify-between">
          <SubHeader text="Latest Directories" size="small" />
        </div>
        {/* Directories */}
        <div className="space-x-1 space-y-6 md:space-x-0 md:space-y-0 md:grid md:grid-cols-2 gap-6 lg:grid-cols-3 3xl:grid-cols-4 xl:gap-7">
          {rootDirectoryData?.subdirectories?.map(
            (directory: DirectoryData, index: number) => (
              <DirectoryCard
                key={index}
                title={directory?.name}
                linkTo={`/dashboard/explore/directory/${directory?._id}`}
              />
            ),
          )}
        </div>
        <div className="pt-32 mb-6 sm:pt-28 flex items-center justify-between">
          <SubHeader text="Latest Quizzes" size="small" />
        </div>
        <LatestQuizzes quizzes={rootDirectoryData?.quizzes} />
      </Container>
      <SideDrawer open={isAddQuizSideDrawerOpen} />
      <ScrollToTop />
    </div>
  );
};

export default DashboardLayout;
