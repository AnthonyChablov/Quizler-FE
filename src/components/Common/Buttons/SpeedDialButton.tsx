import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Icons from "../Icons";
import { useModalStore } from "@/store/useModalStore";

export default function SpeedDialTooltipOpen() {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz;
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
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

  const actions = [
    {
      icon: <Icons type="edit" size={25} color="#7861f3" />,
      name: "Edit",
      onclick: handleRenameClick,
    },
    {
      icon: <Icons type="delete" size={25} color="#7861f3" />,
      name: "Delete",
      onclick: handleDeleteClick,
    },
    {
      icon: <Icons type="play" size={30} color="#7861f3" />,
      name: "Play",
      onclick: handlePlayClick,
    },
  ];

  const {
    isModalOpen,
    isDeleteModalOpen,
    isRenameModalOpen,
    toggleModal,
    toggleDeleteModal,
    toggleRenameModal,
  } = useModalStore((state) => ({
    isModalOpen: state.isModalOpen,
    isDeleteModalOpen: state.isDeleteModalOpen,
    isRenameModalOpen: state.isRenameModalOpen,
    toggleModal: state.toggleModal,
    toggleDeleteModal: state.toggleDeleteModal,
    toggleRenameModal: state.toggleRenameModal,
  }));

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
