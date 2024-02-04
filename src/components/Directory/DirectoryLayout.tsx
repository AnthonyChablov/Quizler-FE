'use client';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { fetchData } from '@/api/quizData';
import { useParams, useRouter, usePathname } from 'next/navigation';
import LoadingLayout from '../Loading/LoadingLayout';
import Container from '../Common/Container';
import QuizHeader from '../Common/Header/QuizHeader';
import SubHeader from '../Common/SubHeader/SubHeader';
import DirectoryCard from '../Dashboard/Cards/DirectoryCard';
import { DirectoryData } from '@/models/directories';
import LatestQuizzes from '../Dashboard/LatestQuizzes/LatestQuizzes';
import SpeedDialTooltipOpen from '../Common/Buttons/SpeedDialButton';
import EditDirectoryModal from '../Common/Modal/DirectoryModals/EditDirectoryModal';
import { useModalStore } from '@/store/useModalStore';
// import { API_BASE_URL } from '@/api/baseApiUrl';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_LOCAL;
import { readDirectory } from '@/api/directoryData';

const DirectoryLayout = () => {
  const router = useRouter();
  const params = useParams();
  const directoryId = params.directory.toString();
  const pathname = usePathname();

  /* State */
  const { isEditDirectoryModalOpen } = useModalStore();

  // Fetch Directories
  const {
    data: directoryData,
    error: directoryError,
    isLoading: directoryLoading,
  } = useSWR(directoryId, readDirectory, {
    revalidateOnFocus: false,
    refreshInterval: 700000,
  });

  useEffect(() => {
    console.log(directoryData);
  }, [directoryData]);

  if (!directoryData) {
    return null; // Render nothing until data is available
  }

  if (directoryLoading) {
    return <LoadingLayout />;
  }

  if (directoryError) {
    return <div>Error loading directory: {directoryError.message}</div>;
  }

  return (
    <div className="h-full min-h-screen bg-slate-200 ">
      <Container>
        <QuizHeader
          // headerText={directoryData.directory.name}
          headerText={'subdirectory name'}
          mode={'end'}
          displayImg={true}
          displayScore={false}
          link={'/dashboard'}
        />
        <div className="pt-14 h-full min-h-screen bg-slate-200">
          {/* Directories */}
          <SubHeader text="Directories" size="small" />
          <div
            className="space-x-1 space-y-6  md:space-x-0 md:space-y-0 
              md:grid md:grid-cols-2 gap-6 lg:grid-cols-3 3xl:grid-cols-4 xl:gap-7"
          >
            {directoryData?.subdirectories?.map(
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
            {/* Directories */}
            <SubHeader text="Quizzes" size="small" />
          </div>
          <LatestQuizzes quizzes={directoryData?.quizzes} />
        </div>
        <SpeedDialTooltipOpen
          isAddDirectory={true}
          isAddQuiz={true}
          isDeleteDirectory={true}
          isEditDirectory={true}
        />
        {/* Add quiz, Add DIrectory , Delete Directory  */}
      </Container>
      <EditDirectoryModal
        isOpen={isEditDirectoryModalOpen}
        onClose={() => {}}
      />
    </div>
  );
};

export default DirectoryLayout;
