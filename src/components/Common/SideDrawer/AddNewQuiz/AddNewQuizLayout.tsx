import React, { useState, useEffect } from "react";
import CloseButton from "../../Buttons/CloseButton";
import { useSWRConfig } from "swr";
import Container from "../../Container";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";
import { Question } from "@/models/quizzes";
import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import CustomButtonGroup from "../../Buttons/CustomButtonGroup";
import AddNewQuizAi from "./AddNewQuizContent/AddNewQuizAI";
import AddNewQuizManually from "./AddNewQuizContent/AddNewQuizManually";
import { useLoadingStore } from "@/store/useLoadingStore";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";

const AddNewQuiz = () => {
  const { mutate } = useSWRConfig();

  const [quizTitle, setQuizTitle] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAddQuizManually, setIsAddQuizManually] = useState(true);
  const [numQuestions, setNumQuestions] = useState(1); // New state for the number of questions
  const { isLoading, setIsLoading } = useLoadingStore();

  const { toggleAddQuizSideDrawer } = useSideDrawerStore();

  const handleAddManuallyClick = () => {
    setIsAddQuizManually(true);
  };

  const handleUseAIClick = () => {
    setIsAddQuizManually(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      <div className="w-full min-h-screen max-h-full py-4 bg-slate-200">
        <Container>
          {/* Content for your side drawer */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Add A New Quiz
            </h2>
            <CloseButton onClick={() => toggleAddQuizSideDrawer(false)} />
          </div>
          {!isLoading ? (
            <>
              <div className="flex justify-center mb-8">
                <CustomButtonGroup
                  onAddManuallyClick={handleAddManuallyClick}
                  onUseAIClick={handleUseAIClick}
                />
              </div>
              {isAddQuizManually && <AddNewQuizManually />}
              {!isAddQuizManually && <AddNewQuizAi />}
            </>
          ) : (
            <div className="mt-40">
              <LoadingSpinner text="Generating Your Quiz" />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AddNewQuiz;
