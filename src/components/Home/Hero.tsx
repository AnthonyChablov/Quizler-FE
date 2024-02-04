import Link from 'next/link';

const Hero = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-semibold mb-4">
          Learn, Play, and Quiz Yourself
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          A platform to enhance your knowledge and have fun at the same time.
        </p>
        <Link
          href="/login"
          className="px-6 py-3  bg-indigo-600
          text-white rounded-full font-semibold transition duration-200 hover:opacity-80"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-6 py-3  bg-indigo-600
          text-white rounded-full font-semibold transition duration-200 hover:opacity-80"
        >
          Register
        </Link>
      </div>
    </header>
  );
};

export default Hero;
