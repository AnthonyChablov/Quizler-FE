import axios, { AxiosResponse } from 'axios';
import { Question } from '@/models/quizzes';
import { API_BASE_URL } from '@/api/baseApiUrl';

async function handleRequest<T>(
  request: Promise<AxiosResponse<T>>,
): Promise<T> {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw new Error(errorData?.error || 'An unknown error occurred');
    }
    throw new Error('An unknown error occurred');
  }
}

export async function addQuestion(
  quizId: string,
  questionData: Question,
): Promise<void> {
  const url = `${API_BASE_URL}/quizzes/question/${quizId}`;
  await handleRequest(
    axios.put(url, questionData, {
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}

export async function deleteQuestion(questionId: string): Promise<void> {
  const url = `${API_BASE_URL}/quizzes/questions/${questionId}`;
  await handleRequest(
    axios.delete(url, { headers: { 'Content-Type': 'application/json' } }),
  );
}

export async function editQuestion(
  questionId: string,
  questionData: Question,
): Promise<Question> {
  const url = `${API_BASE_URL}/quizzes/questions/${questionId}`;
  return handleRequest(
    axios.put(url, questionData, {
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}
