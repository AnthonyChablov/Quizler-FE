import axios, { AxiosResponse } from 'axios';
// import { API_BASE_URL } from '@/api/baseApiUrl';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_LOCAL;
const url = `${API_BASE_URL}/users/login`;
console.log(url);
interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

interface UserLoginData {
  email: string;
  password: string;
}

// User Interface
export interface UserProfile {
  _id: string;
  userName: string;
  rootDir: string; // Assuming rootDir is stored as a string (ObjectId in MongoDB)
}

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

export async function registerUser(
  userData: UserRegistrationData,
): Promise<any> {
  const url = `${API_BASE_URL}/users/register`;

  try {
    return handleRequest(
      axios.post(url, userData, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  } catch (error) {
    throw new Error('An error occurred during user registration');
  }
}

export async function loginUser(userData: UserLoginData): Promise<any> {
  const url = `${API_BASE_URL}/users/login`;

  try {
    return handleRequest(
      axios.post(url, userData, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  } catch (error) {
    throw new Error('An error occurred during user login');
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const url = `${API_BASE_URL}/profile/${userId}`;

  try {
    return handleRequest(axios.get(url));
  } catch (error) {
    throw new Error('An error occurred while retrieving user profile');
  }
}

export async function deleteUserAccount(userId: string): Promise<void> {
  const url = `${API_BASE_URL}/delete/${userId}`;

  try {
    await handleRequest(
      axios.delete(url, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    console.log('User account deleted successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
