// import React, { useState } from 'react';
// import Icons from '../Icons';

// interface CustomButtonGroupProps {
//   onAddManuallyClick: () => void;
//   onUseAIClick: () => void;
// }

// const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({
//   onAddManuallyClick,
//   onUseAIClick,
// }) => {
//   const [isAddQuizManually, setIsAddQuizManually] = useState<boolean>(true);

//   const handleAddManuallyClick = () => {
//     setIsAddQuizManually(true);
//     onAddManuallyClick();
//   };

//   const handleUseAIClick = () => {
//     setIsAddQuizManually(false);
//     onUseAIClick();
//   };

//   return (
//     <div className="flex flex-col xs:flex-row space-y-4 xs:space-x-4 xs:space-y-0 mt-4">
//       <button
//         onClick={handleAddManuallyClick}
//         className={`${
//           isAddQuizManually
//             ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 text-white font-bold '
//             : 'bg-purple-100 text-purple-500 font-regular '
//         } px-4 py-2 rounded-lg focus:outline-none flex items-center justify-center font-semibold text-sm sm:text-md
//         hover:brightness-90 transition-transform transform active:scale-95 `}
//       >
//         Add Manually
//       </button>
//       <button
//         onClick={handleUseAIClick}
//         className={`${
//           !isAddQuizManually
//             ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 text-white font-bold'
//             : 'bg-purple-100 text-purple-500 font-regular'
//         } px-4 py-2 rounded-lg focus:outline-none flex items-center justify-center
//         hover:brightness-90 transition-transform transform active:scale-95
//         `}
//       >
//         <div className="flex ">
//           <p className="mr-2 font-semibold text-sm sm:text-md">Use AI</p>
//           {isAddQuizManually ? (
//             <Icons type="magic" color="#a855f7" size={22} />
//           ) : (
//             <Icons type="magic" color="white" size={22} />
//           )}
//         </div>
//       </button>
//     </div>
//   );
// };

// export default CustomButtonGroup;
