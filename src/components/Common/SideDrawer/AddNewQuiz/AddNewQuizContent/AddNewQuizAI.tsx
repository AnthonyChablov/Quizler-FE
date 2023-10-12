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
import useSWR from "swr";
import { fetchData } from "@/api/quizData";

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

  /* Variables */
  const maxCharacters = 2000;

  const {
    data: directoryData,
    error: directoryError,
    isLoading: directoryLoading,
  } = useSWR(
    `https://quizzlerreactapp.onrender.com/api/directory/6508bbf7a027061a12c9c8e4`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  const handleSubmitAI = async (e: React.FormEvent) => {
    // Ai generated quiz logic
    if (quizTitle.length <= maxCharacters) {
      e.preventDefault();
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
    } else {
      e.preventDefault();
      setTimeout(() => {
        toggleIsNotificationOpen(true);
        setNotificationMode("characterCount");
      }, 1000); // Adjust the timeout duration as needed (in milliseconds)
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
          <p
            className={`mt-2 text-right text-purple-700 text-sm font-regular capitalize font-bold ${
              quizTitle.length > maxCharacters
                ? "text-red-600"
                : "text-purple-700"
            }`}
          >
            Character Count : {quizTitle.length}/{maxCharacters}
          </p>
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
