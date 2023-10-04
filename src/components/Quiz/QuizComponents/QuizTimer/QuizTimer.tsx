import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 50 : 200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#9333EA" : "#38b2ac",
  },
}));

interface QuizTimerProps {
  durationInSeconds: number;
  onTimeout: () => void;
}

const QuizTimer: React.FC<QuizTimerProps> = ({
  durationInSeconds,
  onTimeout,
}) => {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else {
      onTimeout();
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, onTimeout]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div // Wrap your component with motion.div
      className="w-full mt-10"
      initial={{ opacity: 0 }} // Initial state (hidden)
      animate={{ opacity: 1 }} // Animation state (visible)
    >
      <motion.div // Wrap your component with motion.div
        className=" rounded-lg  bg-gradient-to-br from-fuchsia-200  to-purple-300 shadow-md p-5  text-black flex flex-col-reverse"
        initial={{ opacity: 0 }} // Initial state (hidden)
        animate={{ opacity: 1 }} // Animation state (visible)
      >
        <motion.div // Wrap your component with motion.div
          className="flex items-center justify-start space-x-2 mt-2 text-purple-900"
          initial={{ opacity: 0 }} // Initial state (hidden)
          animate={{ opacity: 1 }} // Animation state (visible)
        >
          <p className="text-md  font-semibold">Time Left:</p>
          <div className="flex items-center text-lg">
            <div className="text-md font-semibold">
              <span className=" mr-1">
                {minutes.toString().padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="ml-1">
                {seconds.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </motion.div>
        <BorderLinearProgress
          variant="determinate"
          value={(timeLeft / durationInSeconds) * 100}
        />
      </motion.div>
    </motion.div>
  );
};

export default QuizTimer;
