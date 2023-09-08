import React from 'react';
import Drawer from '@mui/material/Drawer';
import CloseButton from '../Buttons/CloseButton';
import AddNewQuiz from './SideDrawerContent/AddNewQuiz';
import { useSideDrawerStore } from '@/store/useSideDrawerStore';

interface SideDrawerProps {
    open: boolean;
}

const SideDrawer = ({ open  } : SideDrawerProps) => {

  const {toggleAddQuizSideDrawer, isAddQuizSideDrawerOpen}= useSideDrawerStore();

  return (
    <Drawer anchor="left" open={isAddQuizSideDrawerOpen} >
      <AddNewQuiz/>
    </Drawer>
  );
};

export default SideDrawer;
