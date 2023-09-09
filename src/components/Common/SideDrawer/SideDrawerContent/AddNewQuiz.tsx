// @ts-nocheck
import React, { useState } from "react";
import CloseButton from "../../Buttons/CloseButton";
import { useSWRConfig } from "swr";
import Container from "../../Container";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";
import { QuizData, Question } from "@/models/quizzes";
import { addQuiz, addQuizWithAI } from "@/api/quizData";
import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";

const AddNewQuiz = () => {
  const { mutate } = useSWRConfig();

  const [quizTitle, setQuizTitle] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAddQuizManually, setIsAddQuizManually] = useState(true);
  const [numQuestions, setNumQuestions] = useState(1); // New state for the number of questions

  const [newQuestionData, setNewQuestionData] = useState<Question>({
    _id: Math.random().toString(36).substring(7),
    questionTitle: "",
    correct_answer: "",
    incorrect_answers: ["", "", ""],
  });

  const { toggleAddQuizSideDrawer } = useSideDrawerStore();

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestionData]);
    setNewQuestionData({
      _id: Math.random().toString(36).substring(7),
      questionTitle: "",
      correct_answer: "",
      incorrect_answers: ["", "", ""],
    });
  };

  const handleSubmitManually = async (e: React.FormEvent) => {
    e.preventDefault();

    const newQuiz: QuizData = {
      __v: 0,
      _id: Math.random().toString(36).substring(7),
      quizTitle: quizTitle,
      questions: questions,
      numberOfCorrectQuestions: 0,
      numberOfQuestions: numberOfQuestions,
    };

    try {
      await addQuiz(newQuiz);
      setQuizTitle("");
      setQuestions([]);
      toggleAddQuizSideDrawer(false);
      mutate("https://quizzlerreactapp.onrender.com/api/quizzes");
    } catch (error) {
      console.error("An error occurred during manual quiz submission:", error);
      // You can handle the error in the UI, e.g., show an error message
    }
  };

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
      await addQuizWithAI(quizTitle, numQuestions); // await the function call
      toggleAddQuizSideDrawer(false);
      setQuizTitle("");
      setNumQuestions(1); // Reset the number of questions input
      mutate("https://quizzlerreactapp.onrender.com/api/quizzes");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <div className="w-screen h-screen py-4 bg-slate-200">
        <Container>
          {/* Content for your side drawer */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Add A New Quiz
            </h2>
            <CloseButton onClick={() => toggleAddQuizSideDrawer(false)} />
          </div>
          <div className="flex justify-center mb-8">
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button
                onClick={() => {
                  setIsAddQuizManually(true);
                }}
              >
                Add Manually
              </Button>
              <Button
                onClick={() => {
                  setIsAddQuizManually(false);
                }}
              >
                Use AI
              </Button>
            </ButtonGroup>
          </div>

          {isAddQuizManually && (
            <form onSubmit={handleSubmitManually}>
              <label className="flex">
                Quiz Title:
                <input
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  required
                />
              </label>
              <button type="button" onClick={handleAddQuestion}>
                Add Question
              </button>

              {/* Question Fields */}
              {questions.map((question, index) => (
                <div key={index}>
                  <h3>Question {index + 1}</h3>
                  {/* Question input */}
                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    value={question.questionTitle}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].questionTitle = e.target.value;
                      setQuestions(newQuestions);
                    }}
                  />
                  {/* Correct Answer */}
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={question.correct_answer}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].correct_answer = e.target.value;
                      setQuestions(newQuestions);
                    }}
                  />
                  {/* Incorrect Answers */}
                  {question.incorrect_answers.map((answer, answerIndex) => (
                    <input
                      key={answerIndex}
                      type="text"
                      placeholder={`Incorrect Answer ${answerIndex + 1}`}
                      value={answer}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].incorrect_answers[answerIndex] =
                          e.target.value;
                        setQuestions(newQuestions);
                      }}
                    />
                  ))}
                </div>
              ))}
              <button type="submit">Add Quiz</button>
            </form>
          )}
          {!isAddQuizManually && (
            <form onSubmit={handleSubmitAI}>
              {/* AI-generated quiz form */}
              {/* ... */}
              <label className="flex flex-col">
                What would you like your quiz to be about:
                <input
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  required
                />
              </label>
              {/* Input field for the number of questions */}
              <label className="flex flex-col">
                How many questions do you want:
                <input
                  type="number"
                  value={numQuestions}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setNumQuestions(value);
                  }}
                  min="1" // Set a minimum value (1) to ensure a positive number
                  max="30" // Set the maximum value to 10
                  required
                />
              </label>
              <button type="submit">Add Quiz</button>
            </form>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AddNewQuiz;
