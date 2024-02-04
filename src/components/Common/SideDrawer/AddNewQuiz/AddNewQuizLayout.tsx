import React, { useState, useEffect } from 'react';
import CloseButton from '../../Buttons/CloseButton';
import Container from '../../Container';
import { useSideDrawerStore } from '@/store/useSideDrawerStore';
import { Question } from '@/models/quizzes';
import Button from '@mui/material/Button';
import AddNewQuizAi from './AddNewQuizContent/AddNewQuizAI';
import AddNewDirectory from './AddNewQuizContent/AddNewDirectory';
import { useLoadingStore } from '@/store/useLoadingStore';
import LoadingSpinner from '@/components/Loading/LoadingSpinner/LoadingSpinner';
import Icons from '@/components/Common/Icons';

const AddNewQuiz = () => {
  const { isLoading, setIsLoading } = useLoadingStore();
  const { toggleAddQuizSideDrawer } = useSideDrawerStore();
  const [isLeftButton, setIsLeftButton] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleAddManuallyClick = () => {
    setIsLeftButton(true);
  };

  const handleUseAIClick = () => {
    setIsLeftButton(false);
  };

  return (
    <div className="w-full min-h-screen max-h-full py-4 bg-slate-200">
      <Container>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Add A New Quiz</h2>
          <CloseButton onClick={() => toggleAddQuizSideDrawer(false)} />
        </div>
        {!isLoading ? (
          <>
            <div className="flex justify-center mb-8">
              {/* CustomButtonGroup Logic Here */}
              <div className="flex flex-col xs:flex-row space-y-4 xs:space-x-4 xs:space-y-0 mt-4">
                {/* Add Manually Button */}
                <Button
                  onClick={handleAddManuallyClick}
                  className={`${
                    isLeftButton
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 text-white font-bold '
                      : 'bg-purple-100 text-purple-500 font-regular '
                  } px-4 py-2 rounded-lg focus:outline-none flex items-center justify-center font-semibold text-sm sm:text-md 
                  hover:brightness-90 transition-transform transform active:scale-95 `}
                >
                  <div className="flex">
                    <p className="mr-2 font-semibold text-sm sm:text-md">
                      Use AI
                    </p>
                    <Icons
                      type="magic"
                      color={!isLeftButton ? '#a855f7' : 'white'}
                      size={22}
                    />
                  </div>
                </Button>
                {/* Use AI Button */}
                <Button
                  onClick={handleUseAIClick}
                  className={`${
                    !isLeftButton
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 text-white font-bold'
                      : 'bg-purple-100 text-purple-500 font-regular'
                  } px-4 py-2 rounded-lg focus:outline-none flex items-center justify-center
                  hover:brightness-90 transition-transform transform active:scale-95`}
                >
                  Add Directory
                </Button>
              </div>
            </div>
            {/* Conditionally Render Content */}
            {!isLeftButton ? <AddNewDirectory /> : <AddNewQuizAi />}
          </>
        ) : (
          <div className="mt-40">
            <LoadingSpinner text="Generating Your " />
          </div>
        )}
      </Container>
    </div>
  );
};

export default AddNewQuiz;
