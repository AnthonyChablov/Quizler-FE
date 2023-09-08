import React, {useEffect} from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';
import CloseButton from '../Buttons/CloseButton';
import { deleteQuestion } from '@/api/questionData';
import { useModalStore } from '@/store/useModalStore';
import { useQuestionStore } from '@/store/useQuestionStore';
import { Question } from '@/models/quizzes';

interface DisplayCardProps {
  id:string;
  questionTitle: string;
  questionAnswers: string[];
  questionData: Question;
}

const DisplayCard: React.FC<DisplayCardProps> = ({ id, questionTitle, questionAnswers, questionData }) => {

  const { isEditQuestionModalOpen, toggleEditQuestionModal } = useModalStore();  
  const { editQuestionData, editQuestionId, setEditQuestionId, setEditQuestionData } = useQuestionStore();

  function onClickHandeller(){
    toggleEditQuestionModal(!isEditQuestionModalOpen);
    setEditQuestionData(questionData);
    setEditQuestionId(id);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
        <div className=" flex justify-between items-start w-full">
            <h2 className="text-xl font-semibold mb-3 mr-8">{questionTitle}</h2>
            <div className=" flex flex-col-reverse items-end justify-end">
              <PrimaryButton onClick={onClickHandeller} label="Edit"/>
              <CloseButton onClick={() => deleteQuestion(id)}/>
            </div>
        </div>
      <ul className="mb-4">
        {questionAnswers.map((answer, index) => (
          <li  key={index} className="mr-2">
            {`${index+1}. ${answer}`}
          </li >
        ))}
      </ul>
    </div>
  );
};

export default DisplayCard;


