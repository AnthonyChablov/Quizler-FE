export interface Question {
    _id: string;
    questionTitle: string;
    correct_answer: string;
    incorrect_answers: string[];
    isCorrect: boolean;
}

export interface QuizData {
    __v: number;
    _id: string;
    quizTitle: string;
    questions: Question[];
    numberOfCorrectQuestions: number;
    numberOfQuestions: number;
}

export interface Answer {
    answerText: string;
    isCorrect: boolean;
}

export interface QuizResponseData {
    error?: string;
    // Add other properties as needed
  }

