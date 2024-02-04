import React, { useState, useEffect } from 'react';
import CustomButton from '../../../Buttons/CustomButton';
import { QuizData } from '@/models/quizzes';
import { addQuizWithAI } from '@/api/quizData';
import { mutate } from 'swr';
import { useSideDrawerStore } from '@/store/useSideDrawerStore';
import { Question } from '@/models/quizzes';
import Container from '@/components/Common/Container';
import { useRouter } from 'next/navigation';
import { useLoadingStore } from '@/store/useLoadingStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import useSWR from 'swr';
import { fetchData } from '@/api/quizData';
import { createDirectory } from '@/api/directoryData';
// import { API_BASE_URL } from '@/api/baseApiUrl';
const API_BASE_URL = process.env.API_BASE_LOCAL;

const AddNewQuizAi = () => {
  /* State */
  const [quizContent, setQuizContent] = useState('');
  const [numQuestions, setNumQuestions] = useState(20); // Initialize with a default value

  /* directory State */
  const [addToDirectoryMode, setAddToDirectoryMode] = useState<
    'existing' | 'new'
  >('existing');
  const [selectedDirectory, setSelectedDirectory] = useState(''); // State for selected directory
  const [newDirectory, setNewDirectory] = useState(''); // State for new directory

  const [questions, setQuestions] = useState<Question[]>([]);
  const { toggleAddQuizSideDrawer } = useSideDrawerStore();
  const { setIsLoading } = useLoadingStore();
  const { toggleIsNotificationOpen, setNotificationMode } =
    useNotificationStore();

  /* Router */
  const router = useRouter();

  /* Variables */
  const maxCharacters = 6000 * 6;

  const { data: directoryData } = useSWR(
    `${API_BASE_URL}/users/directory`,
    fetchData,
    { revalidateOnFocus: false, refreshInterval: 300000 },
  );

  // const {
  //   data: directoryData,
  //   error: directoryError,
  //   isLoading: directoryLoading,
  // } = useSWR(`${API_BASE_URL}/users/directory`, fetchData, {
  //   revalidateOnFocus: false,
  //   refreshInterval: 300000,
  // });

  /* Directory data state for button toggle */
  const [selectedOption, setSelectedOption] = useState(
    directoryData?.subdirectories.length !== 0 ? 'new' : 'existing',
  );
  const directories = directoryData?.subdirectories || [];

  const handleSubmitAI = async (e: React.FormEvent) => {
    // Calculate character limit based on token approximation (6000 tokens * 6 characters/token)

    e.preventDefault();

    if (quizContent.length > maxCharacters) {
      toggleIsNotificationOpen(true);
      setNotificationMode('characterCount');
      setTimeout(() => {
        toggleIsNotificationOpen(false);
      }, 3000);
      return;
    }

    try {
      setIsLoading(true);
      let directoryId = selectedDirectory;

      if (addToDirectoryMode === 'new') {
        // Create new directory and use its ID
        const newDirResponse = await createDirectory(newDirectory);
        directoryId = newDirResponse._id; // Update directoryId with the ID of the newly created directory
      }

      // Add quiz to the specified directory
      await addQuizWithAI(quizContent, numQuestions, directoryId);
      toggleAddQuizSideDrawer(false);
      // router.push('/dashboard');
      window.location.reload()
      setQuizContent('');
      setNumQuestions(20); // Reset the number of questions input
      // mutate(`${API_BASE_URL}/quizzes`);
    } catch (error) {
      setIsLoading(false);
      toggleIsNotificationOpen(true);
      setNotificationMode('error');
      console.error('An error occurred:', error);
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
            value={quizContent}
            onChange={(e) => setQuizContent(e.target.value)}
            required
          ></input>
          <p
            className={`mt-2 text-right text-purple-700 text-sm font-regular capitalize font-bold ${
              quizContent.length > maxCharacters
                ? 'text-red-600'
                : 'text-purple-700'
            }`}
          >
            Character Count : {quizContent.length}/{maxCharacters}
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
            min="2" // Set a minimum value (1) to ensure a positive number
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
                checked={addToDirectoryMode === 'existing'}
                onChange={() => setAddToDirectoryMode('existing')}
              />
              Existing Directory
            </label>
            <label className="cursor-pointer">
              <input
                className="xs:mr-2 "
                type="radio"
                name="directoryMode"
                value="new"
                checked={addToDirectoryMode === 'new'}
                onChange={() => setAddToDirectoryMode('new')}
              />
              New Directory
            </label>
          </div>
        </div>

        {/*Add Quiz To Existing Directory Input*/}
        {addToDirectoryMode === 'existing' &&
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

        {addToDirectoryMode === 'new' && (
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
            label="Add Quiz!"
            textSize="text-sm md:text-md"
            type="submit"
          />
        </div>
      </Container>
    </form>
  );
};

export default AddNewQuizAi;
