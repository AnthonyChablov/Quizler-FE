import React from "react";
import Icons from "../Icons";
import Link from "next/link";
import { useQuizStore } from "@/store/useQuizStore";
import { useModalStore } from "@/store/useModalStore";
interface QuizHeaderProps {
  headerText: string;
  score?: number;
  displayScore?: boolean;
  link: string;
  mode?: "study" | "intro" | "end";
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  headerText,
  score,
  displayScore,
  link,
  mode,
}) => {
  /* State */
  const isHelpOpen = useQuizStore((state) => state.isHelpOpen);
  const toggleHelp = useQuizStore((state) => state.toggleHelp);
  const { isExitStudyModeModalOpen, toggleExitStudyModeModal } =
    useModalStore();

  return (
    <div className="py-4 relative ">
      <div className="flex justify-between items-center ">
        {mode === "study" && (
          <button
            className="z-10"
            onClick={() => {
              toggleExitStudyModeModal(true);
            }}
          >
            <Icons type="back" color="#7861f3" size={25} />
          </button>
        )}
        {mode === "intro" ||
          (mode === "end" && (
            <Link href={link || "dashboard"} className="z-10">
              <Icons type="back" color="#7861f3" size={25} />
            </Link>
          ))}
        {mode === undefined && (
          <Link href={link || "dashboard"} className="z-10">
            <Icons type="back" color="#7861f3" size={25} />
          </Link>
        )}
        <div className="absolute top-16 md:top-0 inset-0 flex justify-center items-center ">
          <h1 className="font-bold text-lg w-fit truncate ">{headerText}</h1>
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
