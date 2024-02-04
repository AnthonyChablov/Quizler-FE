import axios, { AxiosResponse } from 'axios';
// import { API_BASE_URL } from '@/api/baseApiUrl';
import { Tiktoken } from '@dqbd/tiktoken/lite';
import cl100k_base from '@dqbd/tiktoken/encoders/cl100k_base.json';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_LOCAL;
// Define a function to handle API requests
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

// Create API helper functions

// Function to create a new directory
export async function createDirectory(name: string): Promise<any> {
  const url = `${API_BASE_URL}/users/addDirectory`;
  const reqBody = { name };
  return handleRequest(axios.post(url, reqBody, getAuthHeaders()));
}

// Function to read the users rood directory
export async function readRootDirectory(): Promise<any> {
  const url = `${API_BASE_URL}/users/directory`;
  return handleRequest(axios.get(url, getAuthHeaders()));
}

// Function to read a directory by ID
export async function readDirectory(id: string): Promise<any> {
  const url = `${API_BASE_URL}/users/directory/${id}`;
  return handleRequest(axios.get(url, getAuthHeaders()));
}

// Function to move a directory
export async function moveDirectory(
  directoryId: string,
  newParentId: string,
): Promise<void> {
  const url = `${API_BASE_URL}/directory/move`;
  return handleRequest(
    axios.put(url, { directoryId, newParentId }, getAuthHeaders()),
  );
}

// Function to rename a directory
export async function renameDirectory(
  directoryId: string,
  newTitle: string,
): Promise<void> {
  const url = `${API_BASE_URL}/directory/rename`;
  return handleRequest(
    axios.put(url, { directoryId, newTitle }, getAuthHeaders()),
  );
}

// Function to switch the order of quizzes and subdirectories
export async function switchOrder(
  directoryId: string,
  newQuizIdOrder: string[],
  newSubDirIdOrder: string[],
): Promise<void> {
  const url = `${API_BASE_URL}/directory/switch-order`;
  return handleRequest(
    axios.put(
      url,
      { directoryId, newQuizIdOrder, newSubDirIdOrder },
      getAuthHeaders(),
    ),
  );
}

// Function to delete a directory if it's empty
export async function deleteDirectory(directoryId: string): Promise<void> {
  const url = `${API_BASE_URL}/directory`;
  return handleRequest(
    axios.delete(url, { data: { directoryId }, ...getAuthHeaders() }),
  );
}

// Function to move a quiz between directories
export async function moveQuiz(
  quizId: string,
  newDirectoryId: string,
): Promise<void> {
  const url = `${API_BASE_URL}/quizzes/move`;
  return handleRequest(
    axios.put(url, { quizId, newDirectoryId }, getAuthHeaders()),
  );
}
