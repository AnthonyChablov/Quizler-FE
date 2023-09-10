import React, { useEffect } from "react";
import { updateStudyResults } from "@/api/quizData";

const EndQuizLayout = () => {
  /* useEffect(() => {
    const updateResults = async () => {
      try {
        const response = await updateStudyResults(quizId, correctQuestionIDs);
        console.log("Study results updated successfully:", response);
      } catch (error) {
        console.error("Error updating study results:", error);
      }
    };
    updateResults();
  }, []); */

  return <div>EndQuizLayout</div>;
};

export default EndQuizLayout;
