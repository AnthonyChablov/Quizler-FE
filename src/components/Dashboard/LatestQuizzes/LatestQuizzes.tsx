import { motion, AnimatePresence } from 'framer-motion';
import { QuizData } from '@/models/quizzes';
import QuizCard from '../Cards/QuizCard';

const LatestQuizzes: React.FC<{ quizzes: QuizData[] }> = ({ quizzes }) => {
  return (
    <div
      className="space-x-1 space-y-6 pb-28 md:space-x-0 md:space-y-0 
        md:grid md:grid-cols-2 gap-6 lg:grid-cols-3 3xl:grid-cols-4 xl:gap-7"
    >
      <AnimatePresence>
        {quizzes.map((quiz, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.4 }}
            exit={{ opacity: 0 }}
          >
            <QuizCard
              topic={quiz?.quizTitle}
              numQuestions={quiz?.numberOfQuestions}
              numCorrectQuestions={quiz?.numberOfCorrectQuestions}
              linkTo={`/dashboard/quiz/${quiz?._id}`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LatestQuizzes;
