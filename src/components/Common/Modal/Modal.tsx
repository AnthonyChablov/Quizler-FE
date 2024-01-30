interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div
        className="fixed inset-0 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="bg-white rounded-lg p-6 z-20">{children}</div>
    </div>
  );
};

export default Modal;
