import React from "react";
import Icons from "@/components/Common/Icons";
import Link from "next/link";
import { useQuizStore } from "@/store/useQuizStore";

interface SingleQuizHeaderProps {
  headerText: string;
  score: number;
  link: string;
}

const SingleQuizHeader: React.FC<SingleQuizHeaderProps> = ({
  headerText,
  score,
  link,
}) => {
  /* State */
  const isHelpOpen = useQuizStore((state) => state.isHelpOpen);
  const toggleHelp = useQuizStore((state) => state.toggleHelp);

  return (
    <div className="py-4">
      <div className="flex justify-between items-center">
        <Link href={"/dashboard"}>
          <Icons type="back" color="#7861f3" size={25} />
        </Link>
        <h1 className="font-bold text-lg">{headerText}</h1>
        <p className="font-semibold text-sm">Score : {score}</p>
      </div>
    </div>
  );
};

export default SingleQuizHeader;
