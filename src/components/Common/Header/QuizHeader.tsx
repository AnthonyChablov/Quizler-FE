import React from "react";
import Icons from "../Icons";
import Link from "next/link";
import { useQuizStore } from "@/store/useQuizStore";

interface QuizHeaderProps {
  headerText: string;
  score?: number;
  displayScore?: boolean;
  link: string;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  headerText,
  score,
  displayScore,
  link,
}) => {
  /* State */
  const isHelpOpen = useQuizStore((state) => state.isHelpOpen);
  const toggleHelp = useQuizStore((state) => state.toggleHelp);

  return (
    <div className="py-4 relative">
      <div className="flex justify-between items-center">
        <Link href={link || "dashboard"} className="z-10">
          <Icons type="back" color="#7861f3" size={25} />
        </Link>
        <div className="absolute top-16 md:top-0 inset-0 flex justify-center items-center">
          <h1 className="font-bold text-lg w-fit truncate">{headerText}</h1>
        </div>
        {/* <button onClick={() => toggleHelp(!isHelpOpen)}>
          <Icons type='question' color='#7861f3' size={25}/>
        </button> */}
        {displayScore && (
          <div className="flex items-center">
            <p className="font-semibold text-sm">Score : {score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;
