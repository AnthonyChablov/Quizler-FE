import React from "react";
import BottomNav from "@/components/Dashboard/Navigation/BottomNav";
import StudyingQuizLayout from "@/components/Quiz/StudyingQuiz/StudyingQuizLayout";

const pages = () => {
  return (
    <div>
      <StudyingQuizLayout />
      <BottomNav />
    </div>
  );
};

export default pages;
