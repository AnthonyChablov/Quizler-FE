import React from 'react';
import BottomNav from '@/components/Dashboard/Navigation/BottomNav';
import EndQuizLayout from '@/components/Quiz/EndQuiz/EndQuizLayout';

const page = () => {
  return (
    <div>
      <EndQuizLayout />
      <BottomNav />
    </div>
  );
};

export default page;
