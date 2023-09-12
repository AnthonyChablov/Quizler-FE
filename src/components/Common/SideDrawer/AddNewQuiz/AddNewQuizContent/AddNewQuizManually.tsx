import React, { useState } from "react";
import CustomButton from "../../../Buttons/CustomButton";
import { QuizData, Question } from "@/models/quizzes";
import { mutate } from "swr";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";
import { addQuiz } from "@/api/quizData";
import Container from "@/components/Common/Container";
import FormTextInput from "@/components/Common/Form/FormTextInput";
import Icons from "@/components/Common/Icons";

const AddNewQuizManually = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { toggleAddQuizSideDrawer } = useSideDrawerStore();
  const [newQuestionData, setNewQuestionData] = useState<Question>({
    _id: Math.random().toString(36).substring(7),
    questionTitle: "",
    correct_answer: "",
    incorrect_answers: ["", "", ""],
    isCorrect: false, // Add the isCorrect property
  });

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestionData]);
    setNewQuestionData({
      _id: Math.random().toString(36).substring(7),
      questionTitle: "",
      correct_answer: "",
      incorrect_answers: ["", "", ""],
      isCorrect: false, // Add the isCorrect property
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
    }
  };

  return (
    <form onSubmit={handleSubmitManually}>
      <Container>
        {/* Quiz Title Input */}
        <FormTextInput
          quizTitle="QuestionTitleInput"
          label="Quiz Title:"
          onChange={(e) => setQuizTitle(e.target.value)}
          type="text"
          value={quizTitle}
          isRequired={true}
          placeHolder="Enter Quiz Title Here..."
        />

        {/* Question Fields */}
        {questions.map((question, index) => (
          <div
            key={index}
            className="mb-6 bg-slate-300 p-5 rounded-xl shadow-md"
          >
            {/* Question Input */}
            <FormTextInput
              quizTitle="QuestionInput"
              label={`Question ${index + 1}`}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].questionTitle = e.target.value;
                setQuestions(newQuestions);
              }}
              type="text"
              value={question.questionTitle}
              isRequired={true}
              placeHolder={`Enter Question ${index + 1} Here...`}
            />

            {/* Correct Answer Input */}
            <FormTextInput
              quizTitle="CorrectAnswer"
              label="Correct Answer"
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].correct_answer = e.target.value;
                setQuestions(newQuestions);
              }}
              type="text"
              value={question.correct_answer}
              isRequired={true}
              placeHolder="Enter Correct Answer..."
            />

            {/* Incorrect Answers */}
            {question.incorrect_answers.map((answer, answerIndex) => (
              <FormTextInput
                quizTitle="IncorrectAnswer"
                key={answerIndex}
                label={`Incorrect Answer ${answerIndex + 1}`}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].incorrect_answers[answerIndex] =
                    e.target.value;
                  setQuestions(newQuestions);
                }}
                type="text"
                value={answer}
                isRequired={true}
                placeHolder={`Enter Incorrect Answer ${answerIndex + 1}`}
              />
            ))}
          </div>
        ))}

        {/* Buttons */}
        <div className="text-center mt-2">
          <CustomButton
            onClick={handleAddQuestion}
            label="Add Question"
            textSize="text-sm md:text-md"
            secondary={true}
            color="none"
            textColor="text-black"
            type="button"
          />
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

export default AddNewQuizManually;
