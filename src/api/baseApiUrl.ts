export let API_BASE_URL: string;

if (process.env.URL_ENV === "test") {
   API_BASE_URL = "http://localhost:8080/api";
} else {
   API_BASE_URL = "https://quizler-fe.vercel.app/api";
}
