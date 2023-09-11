"use client";
import Icons from "@/components/Common/Icons";
import React, { useState } from "react";
import CloseButton from "@/components/Common/Buttons/CloseButton";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";

const DashBoardMenu = () => {
  /* State */
  const [isAddingQuiz, setIsAddingQuiz] = useState(false);
  const [quizData, setQuizData] = useState("");
  const { toggleAddQuizSideDrawer } = useSideDrawerStore();

  const handleAddQuizClick = () => {
    toggleAddQuizSideDrawer(true);
  };

  const handleCloseButtonClick = () => {
    setIsAddingQuiz(false);
  };

  const handleSaveQuizClick = () => {
    console.log("Quiz data:", quizData);
    handleCloseButtonClick();
    setQuizData("");
  };

  return (
    <div
      className="absolute top-48 sm:top-38 md:top-38 left-1/2 transform -translate-x-1/2 bg-slate-50 w-3/4 
      max-w-xl px-8 py-6 rounded-xl shadow-xl"
    >
      <div className="flex items-center justify-between pb-4">
        <h2 className="font-semibold text-md sm:text-lg md:text-lg mb-2">
          {"Add New Quiz"}
        </h2>
      </div>
      <p className="text-gray-700 text-left text-sm">
        Add a new quiz to play and challenge yourself.
        <button
          className=" text-indigo-500 underline cursor-pointer"
          onClick={handleAddQuizClick}
        >
          Click here to add.
        </button>
      </p>
    </div>
  );
};

export default DashBoardMenu;
