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
import { createDirectory } from "@/api/directoryData";

const AddNewQuizAi = () => {
  /* State */
  const [quizTitle, setQuizTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(1); // Initialize with a default value

  /* directory State */
  const [addToDirectoryMode, setAddToDirectoryMode] = useState<
    "existing" | "new"
  >("existing");
  const [selectedDirectory, setSelectedDirectory] = useState(""); // State for selected directory
  const [newDirectory, setNewDirectory] = useState(""); // State for new directory

  const [questions, setQuestions] = useState<Question[]>([]);
  const { toggleAddQuizSideDrawer } = useSideDrawerStore();
  const { setIsLoading } = useLoadingStore();
  const { toggleIsNotificationOpen, setNotificationMode } =
    useNotificationStore();

  /* Router */
  const router = useRouter();

  /* Variables */
  const maxCharacters = 2000;
  const parentDirectoryId = "6508bbf7a027061a12c9c8e4";

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

  /* Direcotyr data state for button toggle */
  const [selectedOption, setSelectedOption] = useState(
    directoryData?.subdirectories.length !== 0 ? "new" : "existing"
  );
  const directories = directoryData?.subdirectories || [];

  const handleSubmitAI = async (e: React.FormEvent) => {
    // Ai generated quiz logic
    if (quizTitle.length <= maxCharacters) {
      e.preventDefault();
      try {
        setIsLoading(true);

        if (addToDirectoryMode === "new") {
          /* Need to create directory first */
          await createDirectory(newDirectory, parentDirectoryId);
          /* Then make req to add quiz to that directory  */
          await addQuizWithAI(quizTitle, numQuestions, ""); // await the function call
        } else {
          await addQuizWithAI(quizTitle, numQuestions, selectedDirectory); // await the function call
        }

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
      toggleIsNotificationOpen(true);
      setNotificationMode("characterCount");
      setTimeout(() => {
        toggleIsNotificationOpen(false);
      }, 3000); // timeout to 3 seconds
    }
  };

  return (
    <form onSubmit={handleSubmitAI}>
      <Container>
        {/* AI-generated quiz form */}
        {/* Quiz Title Input */}
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
        {/* Number Questions Input*/}
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
        {/* Toggle Button for directory mode  */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Directory Mode:
          </label>
          <div className="flex justify-between">
            <label className="cursor-pointer">
              <input
                className="xs:mr-2 cursor-pointer"
                type="radio"
                name="directoryMode"
                value="existing"
                checked={addToDirectoryMode === "existing"}
                onChange={() => setAddToDirectoryMode("existing")}
              />
              Existing Directory
            </label>
            <label className="cursor-pointer">
              <input
                className="xs:mr-2 "
                type="radio"
                name="directoryMode"
                value="new"
                checked={addToDirectoryMode === "new"}
                onChange={() => setAddToDirectoryMode("new")}
              />
              New Directory
            </label>
          </div>
        </div>

        {/*Add Quiz To Existing Directory Input*/}
        {addToDirectoryMode === "existing" &&
          directoryData?.subdirectories.length !== 0 && (
            // Existing Directory Input
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select an Existing Directory:
              </label>
              <select
                className="shadow cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="selectedDirectory"
                value={selectedDirectory}
                onChange={(e) => {
                  setSelectedDirectory(e.target.value);
                }}
              >
                <option value="">Select an existing directory</option>
                {directories.map((directory: any) => (
                  <option key={directory.id} value={directory._id}>
                    {directory.name}
                  </option>
                ))}
              </select>
            </div>
          )}

        {addToDirectoryMode === "new" && (
          // New Directory Input
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Add a New Directory:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newDirectory"
              type="text"
              placeholder="Enter New Directory Name..."
              value={newDirectory}
              onChange={(e) => setNewDirectory(e.target.value)}
            />
          </div>
        )}
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
