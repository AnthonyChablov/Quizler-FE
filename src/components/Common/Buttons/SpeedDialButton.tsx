import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Icons from "../Icons";
import { useModalStore } from "@/store/useModalStore";

interface ISpeedDialTooltipOpen {
  isEdit?: boolean;
  isDelete?: boolean;
  isRename?: boolean;
  isAddDirectory?: boolean;
  isAddQuiz?: boolean;
  isDeleteDirectory?: boolean;
  isEditDirectory?: boolean;
}

export default function SpeedDialTooltipOpen({
  isEdit,
  isDelete,
  isRename,
  isAddDirectory,
  isAddQuiz,
  isDeleteDirectory,
  isEditDirectory,
}: ISpeedDialTooltipOpen) {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz;
  const router = useRouter();

  /* State */
  const [open, setOpen] = React.useState(false);

  /* Functions for handelling buttons*/
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    handleClose();
    toggleDeleteModal(true);
  };

  const handleRenameClick = () => {
    handleClose();
    toggleRenameModal(true);
  };

  const handlePlayClick = () => {
    handleClose();
    router.push(`/dashboard/quiz/${quizId}`);
  };

  const handleAddDirectoryClick = () => {
    // Handle Add Directory click here
    handleClose();
  };

  const handleAddQuizClick = () => {
    // Handle Add Quiz click here
    handleClose();
  };

  const handleDeleteDirectoryClick = () => {
    // Handle Delete Directory click here
    handleClose();
  };

  const handleEditDirectoryClick = () => {
    // Handle Delete Directory click here
    handleClose();
    toggleEditDirectoryModalOpen(true);
  };

  // Create an array to store the actions based on props
  let actions = [];

  if (isEdit) {
    actions.push({
      icon: <Icons type="edit" size={25} color="#7861f3" />,
      name: "Edit",
      onclick: handleRenameClick,
    });
  }

  if (isDelete) {
    actions.push({
      icon: <Icons type="delete" size={25} color="#7861f3" />,
      name: "Delete",
      onclick: handleDeleteClick,
    });
  }

  if (isRename) {
    actions.push({
      icon: <Icons type="edit" size={25} color="#7861f3" />,
      name: "Rename",
      onclick: handleRenameClick,
    });
  }

  if (isAddDirectory) {
    actions.push({
      icon: <Icons type="add" size={25} color="#7861f3" />,
      name: "Add Directory",
      onclick: handleAddDirectoryClick,
    });
  }

  if (isAddQuiz) {
    actions.push({
      icon: <Icons type="add" size={25} color="#7861f3" />,
      name: "Add Quiz",
      onclick: handleAddQuizClick,
    });
  }

  if (isDeleteDirectory) {
    actions.push({
      icon: <Icons type="delete" size={25} color="#7861f3" />,
      name: "Delete Directory",
      onclick: handleDeleteDirectoryClick,
    });
  }

  if (isEditDirectory) {
    actions.push({
      icon: <Icons type="edit" size={25} color="#7861f3" />,
      name: "Edit Directory",
      onclick: handleEditDirectoryClick,
    });
  }

  const {
    isModalOpen,
    isDeleteModalOpen,
    isRenameModalOpen,
    toggleModal,
    toggleDeleteModal,
    toggleRenameModal,

    /* Directories */
    toggleEditDirectoryModalOpen,
  } = useModalStore();

  return (
    <Box
      sx={{
        height: 330,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 60,
        right: 30,
        zIndex: 100,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        FabProps={{
          sx: {
            background: "linear-gradient(to right, #7861f3,  #7861f3)",
            color: "white", // Text color
            "&:hover": {
              background: "linear-gradient(to right, #667eea,  #667eea)",
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.onclick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
