import React from "react";
import Drawer from "@mui/material/Drawer";
import AddNewQuiz from "./SideDrawerContent/AddNewQuiz";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
const drawerWidth = "25vw"; // Width for desktop (quarter of the viewport width)

interface SideDrawerProps {
  open: boolean;
}

const SideDrawer = ({ open }: SideDrawerProps) => {
  const { toggleAddQuizSideDrawer, isAddQuizSideDrawerOpen } =
    useSideDrawerStore();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Drawer
      anchor="left"
      open={isAddQuizSideDrawerOpen}
      PaperProps={
        largeScreen
          ? {
              sx: {
                width: 450,
              },
            }
          : {
              sx: {
                width: "100%",
              },
            }
      }
    >
      <AddNewQuiz />
    </Drawer>
  );
};

export default SideDrawer;
