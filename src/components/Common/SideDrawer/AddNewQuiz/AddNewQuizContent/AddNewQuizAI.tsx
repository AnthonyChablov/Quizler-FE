import React, { useState, useEffect } from "react";
import CustomButton from "../../../Buttons/CustomButton";
import { QuizData } from "@/models/quizzes";
import { addQuizWithAI } from "@/api/quizData";
import { mutate } from "swr";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";
import { Question } from "@/models/quizzes";
import Container from "@/components/Common/Container";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useNotificationStore } from "@/store/useNotificationStore";

const AddNewQuizAi = () => {
  /* State */
  const [quizTitle, setQuizTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(1); // Initialize with a default value
  const [questions, setQuestions] = useState<Question[]>([]);
  const { toggleAddQuizSideDrawer } = useSideDrawerStore();
  const { setIsLoading } = useLoadingStore();
  const { toggleIsNotificationOpen, setNotificationMode } =
    useNotificationStore();

  /* Router */
  const router = useRouter();

  const handleSubmitAI = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ai generated quiz logic
    const newQuiz: QuizData = {
      __v: 0,
      _id: Math.random().toString(36).substring(7),
      quizTitle: quizTitle,
      questions: questions,
      numberOfCorrectQuestions: 0,
      numberOfQuestions: numQuestions,
    };

    try {
      setIsLoading(true);
      await addQuizWithAI(quizTitle, numQuestions); // await the function call
      toggleAddQuizSideDrawer(false);
      setQuizTitle("");
      setNumQuestions(1); // Reset the number of questions input
      mutate("https://quizzlerreactapp.onrender.com/api/quizzes");
    } catch (error) {
      setIsLoading(false);
      toggleIsNotificationOpen(true);
      setNotificationMode("error");
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmitAI}>
      <Container>
        {/* AI-generated quiz form */}
        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quizTitle"
          >
            What would you like your quiz to be about:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numQuestions"
            type="text"
            placeholder="Enter Quiz Title..."
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            required
          ></input>
        </div>
        {/*  */}
        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quizTitle"
          >
            Enter number (max 30 questions)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numQuestions"
            type="number"
            placeholder="Enter Number of Questions..."
            value={numQuestions}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setNumQuestions(value);
            }}
            min="1" // Set a minimum value (1) to ensure a positive number
            max="30" // Set the maximum value to 30 (or any other suitable limit)
            required
          ></input>
        </div>
        <div className="w-full text-center mt-2">
          <CustomButton
            label="Add Quiz"
            textSize="text-sm md:text-md"
            type="submit"
          />
        </div>
      </Container>
    </form>
  );
};

export default AddNewQuizAi;
