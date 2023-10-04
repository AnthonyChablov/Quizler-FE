"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import SubHeader from "@/components/Common/SubHeader/SubHeader";
import Container from "@/components/Common/Container";
import DashBoardMenu from "./DashBoardMenu/DashBoardMenu";
import { fetchData } from "@/api/quizData";
import SideDrawer from "../Common/SideDrawer/SideDrawer";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";
import ScrollToTop from "../Common/Buttons/ScrollToTop";
import LoadingLayout from "../Loading/LoadingLayout";
import Hero from "../Common/Hero/Hero";
import LatestQuizzes from "./LatestQuizzes/LatestQuizzes";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNotificationStore } from "@/store/useNotificationStore";
import Notification from "../Common/Notification/Notification";

const DashboardLayout = () => {
  // Fetch quiz data from the API using useSWR
  const { data, error, isLoading } = useSWR(
    "https://quizzlerreactapp.onrender.com/api/quizzes",
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );
  const { isAddQuizSideDrawerOpen } = useSideDrawerStore();
  const { isNotificationOpen, toggleIsNotificationOpen } =
    useNotificationStore();

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (isLoading) {
    return <LoadingLayout />;
  }
  return (
    <div className="h-full min-h-screen bg-slate-200 ">
      <Hero
        title="🚀 Test Your Knowledge!"
        description="🧠 
            Get ready to embark on an epic journey of discovery and learning."
      />
      <Container>
        <DashBoardMenu />
        <div className="pt-32 sm:pt-28">
          <SubHeader text="Latest Quizzes" size="small" />
        </div>
        <LatestQuizzes quizzes={data} />
        <SubHeader text="My Quizzes" size="small" />
      </Container>
      <SideDrawer open={isAddQuizSideDrawerOpen} />
      <Notification />
      <ScrollToTop />
    </div>
  );
};

export default DashboardLayout;
