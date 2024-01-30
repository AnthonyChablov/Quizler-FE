import axios, { AxiosResponse } from 'axios';
import { Question, QuizResponseData } from '@/models/quizzes';
import { API_BASE_URL } from '@/api/baseApiUrl';

async function handleRequest<T>(
  request: Promise<AxiosResponse<T>>,
): Promise<T> {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // More detailed error logging
      console.error('Axios error:', error.response?.data || error.message);
      const errorData = error.response?.data;
      throw new Error(errorData?.error || 'An unknown error occurred');
    } else {
      // Non-Axios errors
      console.error('Non-Axios error:', error);
      throw new Error('An unknown error occurred');
    }
  }
}

const getAuthHeaders = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export async function fetchData(url: string): Promise<any> {
  return handleRequest(axios.get(url, getAuthHeaders()));
}

export async function renameQuiz(
  quizId: string,
  newQuizTitle: string,
): Promise<any> {
  const url = `${API_BASE_URL}/quizzes/${quizId}`;
  return handleRequest(
    axios.put(url, { quizTitle: newQuizTitle }, getAuthHeaders()),
  );
}

export async function deleteQuiz(quizId: string): Promise<any> {
  const url = `${API_BASE_URL}/quizzes/${quizId}`;
  return handleRequest(axios.delete(url, getAuthHeaders()));
}

export async function addQuiz(quizData: any): Promise<void> {
  const url = `${API_BASE_URL}/quizzes`;
  await handleRequest(axios.post(url, quizData, getAuthHeaders()));
}

export async function restartQuiz(quizId: string): Promise<QuizResponseData> {
  const url = `${API_BASE_URL}users/quizzes/${quizId}/restart`;
  return handleRequest(axios.put(url, {}, getAuthHeaders()));
}

export async function updateStudyResults(
  quizId: string,
  correctQuestionsParam: string[],
): Promise<any> {
  const url = `${API_BASE_URL}/users/quizzes/${quizId}/markCorrect`;
  return handleRequest(
    axios.put(
      url,
      { correctQuestions: correctQuestionsParam },
      getAuthHeaders(),
    ),
  );
}

export async function addQuizWithAI(
  quizTopic: string,
  questionCount: number,
  directoryId: string,
): Promise<any> {
  const url = `${API_BASE_URL}/users/quizzes/openai`;
  const requestData = {
    quizTopic: quizTopic,
    questionCount: questionCount,
    directory: directoryId,
  };
  return await handleRequest(axios.post(url, requestData, getAuthHeaders()));
}
