import CustomButton from "@/components/Common/Buttons/CustomButton";
import Score from "../Score/Score";

interface IQuizInfoDisplay {
  quizTitle: string;
  quizText: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
  showScore?: boolean; // Make showScore optional
  scoreProps?: {
    // Make scoreProps optional
    score: number;
    onTryAgain: () => void;
    percentage: number;
  };
}

const QuizInfoDisplay = ({
  quizTitle,
  quizText,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  showScore = false, // Default showScore to false if not provided
  scoreProps = { score: 0, onTryAgain: () => {}, percentage: 0 }, // Default scoreProps
}: IQuizInfoDisplay) => {
  return (
    <div
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
      rounded-t-xl p-8 text-center text-white shadow-xl mt-12"
    >
      <h1 className="text-3xl font-bold mb-6">{quizTitle}! 🎉</h1>
      <p className="text-md mb-8">{quizText}</p>
      {showScore && <Score {...scoreProps} />}{" "}
      {/* Conditionally render the Score component */}
      <div className="space-y-4 md:space-x-4 mt-4">
        <CustomButton
          label={primaryButtonLabel}
          onClick={onPrimaryButtonClick}
          color="bg-white"
          textSize="text-sm sm:text-md md:text-lg"
          textColor="text-purple-600"
        />
        <CustomButton
          label={secondaryButtonLabel}
          onClick={onSecondaryButtonClick}
          textSize="text-sm sm:text-md md:text-lg"
          color="none"
          underlineOnHover={true}
          secondary={true}
        />
      </div>
    </div>
  );
};

export default QuizInfoDisplay;
