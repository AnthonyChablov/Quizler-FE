import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/api/baseApiUrl';
import { Tiktoken } from '@dqbd/tiktoken/lite';
import cl100k_base from '@dqbd/tiktoken/encoders/cl100k_base.json';

// Define a function to handle API requests
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

// Create API helper functions

// Function to create a new directory
export async function createDirectory(
  name: string,
  // parentDirectoryId: string | undefined,
): Promise<any> {
  const url = `${API_BASE_URL}/users/addDirectory`;
  /* Requst Body */
  const reqBody = {
    name,
    // parentDirectoryId,
  };
  try {
    await handleRequest(
      axios.post(url, reqBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    );
  } catch (err) {
    throw new Error('An error occurred while adding a quiz with AI');
  }
}

// Function to read the users rood directory
export async function readRootDirectory(): Promise<any> {
  const url = `${API_BASE_URL}/users/directory`; // Make sure URL includes the directory ID
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');
  // Configure the headers with the Authorization token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return handleRequest(axios.get(url, config));
}

// Function to read a directory by ID
export async function readDirectory(id: string): Promise<any> {
  const url = `${API_BASE_URL}/directory/${id}`;
  return handleRequest(axios.get(url));
}

// Function to move a directory
export async function moveDirectory(
  directoryId: string,
  newParentId: string,
): Promise<void> {
  const url = `${API_BASE_URL}/directory/move`;
  await handleRequest(
    axios.put(
      url,
      {
        directoryId,
        newParentId,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    ),
  );
}

// Function to rename a directory
export async function renameDirectory(
  directoryId: string,
  newTitle: string,
): Promise<void> {
  const url = `${API_BASE_URL}/directory/rename`;
  await handleRequest(
    axios.put(
      url,
      {
        directoryId,
        newTitle,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    ),
  );
}

// Function to switch the order of quizzes and subdirectories
export async function switchOrder(
  directoryId: string,
  newQuizIdOrder: string[],
  newSubDirIdOrder: string[],
): Promise<void> {
  const url = `${API_BASE_URL}/directory/switch-order`;
  await handleRequest(
    axios.put(
      url,
      {
        directoryId,
        newQuizIdOrder,
        newSubDirIdOrder,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    ),
  );
}

// Function to delete a directory if it's empty
export async function deleteDirectory(directoryId: string): Promise<void> {
  const url = `${API_BASE_URL}/directory`;
  await handleRequest(
    axios.delete(url, {
      data: { directoryId },
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}

// Function to move a quiz between directories
export async function moveQuiz(
  quizId: string,
  newDirectoryId: string,
): Promise<void> {
  const url = `${API_BASE_URL}/quizzes/move`;
  await handleRequest(
    axios.put(
      url,
      {
        quizId,
        newDirectoryId,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    ),
  );
}
