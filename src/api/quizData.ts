import axios, { AxiosResponse } from "axios";
import { Question, QuizResponseData } from "@/models/quizzes";
import { API_BASE_URL } from "./baseApiUrl";

async function handleRequest<T>(
  request: Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw new Error(errorData?.error || "An unknown error occurred");
    }
    throw new Error("An unknown error occurred");
  }
}

export async function fetchData(url: string): Promise<any> {
  return handleRequest(axios.get(url));
}

export async function renameQuiz(
  quizId: string,
  newQuizTitle: string
): Promise<any> {
  const url = `${API_BASE_URL}/quizzes/rename/${quizId}`;

  try {
    return handleRequest(
      axios.put(
        url,
        { quizTitle: newQuizTitle },
        { headers: { "Content-Type": "application/json" } }
      )
    );
  } catch (error) {
    throw new Error("An error occurred while renaming the quiz");
  }
}

export async function deleteQuiz(quizId: string): Promise<any> {
  const url = `${API_BASE_URL}/quizzes/${quizId}`;

  try {
    return handleRequest(
      axios.delete(url, { headers: { "Content-Type": "application/json" } })
    );
  } catch (error) {
    throw new Error("An error occurred while deleting the quiz");
  }
}

export async function addQuiz(quizData: any): Promise<void> {
  const url = `${API_BASE_URL}/quizzes`;

  try {
    await handleRequest(
      axios.post(url, quizData, {
        headers: { "Content-Type": "application/json" },
      })
    );
    console.log("Quiz added successfully");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function restartQuiz(quizId: string): Promise<QuizResponseData> {
  const url = `${API_BASE_URL}/quizzes/restart/${quizId}`;

  try {
    return handleRequest(axios.put(url));
  } catch (error) {
    throw new Error("An error occurred while restarting the quiz");
  }
}

export async function updateStudyResults(
  quizId: string,
  correctQuestionsParam: string[]
): Promise<any> {
  const url = `${API_BASE_URL}/quizzes/update/${quizId}`;

  console.log(url);
  try {
    return handleRequest(
      axios.put(url, { correctQuestions: correctQuestionsParam })
    );
  } catch (error) {
    throw new Error("An error occurred while updating study results");
  }
}

export async function addQuizWithAI(
  quizTopic: string,
  questionCount: number,
  directoryId: string
): Promise<any> {
  const url = `${API_BASE_URL}/quizzes/openai`; // Your API endpoint to add a quiz with AI

  const headers = {
    "Content-Type": "application/json",
  };

  /* Req Body */
  const requestData = {
    quizTopic: quizTopic,
    questionCount: questionCount,
    directory: directoryId,
  };

  try {
    return await axios.post(url, requestData, { headers });
  } catch (error) {
    throw new Error("An error occurred while adding a quiz with AI");
  }
}
