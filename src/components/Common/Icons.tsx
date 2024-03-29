import {
  BiSolidHome,
  BiSolidCompass,
  BiSolidUserCircle,
  BiPlay,
  BiShow,
  BiHide,
  BiSolidMagicWand,
} from 'react-icons/bi';
import { IoMdClose, IoMdArrowBack, IoMdAddCircleOutline } from 'react-icons/io';
import {
  AiOutlineQuestionCircle,
  AiFillDelete,
  AiOutlineEdit,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { FaArrowUp } from 'react-icons/fa';

interface IIcons {
  type: string;
  size: number;
  color?: string;
}

const Icons = ({ type, size, color }: IIcons) => {
  return (
    <div className="text-white">
      {
        {
          magic: <BiSolidMagicWand size={size} color={color} />,
          show: <BiShow size={size} color={color} />,
          hide: <BiHide size={size} color={color} />,
          plus: <AiOutlinePlus size={size} color={color} />,
          minus: <AiOutlineMinus size={size} color={color} />,
          up: <FaArrowUp size={size} color={color} />,
          play: <BiPlay size={size} color={color} />,
          add: <IoMdAddCircleOutline size={size} color={color} />,
          edit: <AiOutlineEdit size={size} color={color} />,
          close: <IoMdClose size={size} color={color} />,
          home: <BiSolidHome size={size} color={color} />,
          explore: <BiSolidCompass size={size} color={color} />,
          user: <BiSolidUserCircle size={size} color={color} />,
          back: <IoMdArrowBack size={size} color={color} />,
          question: <AiOutlineQuestionCircle size={size} color={color} />,
          delete: <AiFillDelete size={size} color={color} />,
        }[type]
      }
    </div>
  );
};

export default Icons;
