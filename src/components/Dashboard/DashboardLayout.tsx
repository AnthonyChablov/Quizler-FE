"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion components
import SubHeader from "@/components/Common/SubHeader/SubHeader";
import Container from "@/components/Common/Container";
import QuizCard from "./Cards/QuizCard";
import DashBoardMenu from "./DashBoardMenu/DashBoardMenu";
import { QuizData } from "@/models/quizzes";
import { fetchData } from "@/api/quizData";
import SideDrawer from "../Common/SideDrawer/SideDrawer";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";
import ScrollToTop from "../Common/Buttons/ScrollToTop";
import LoadingLayout from "../Loading/LoadingLayout";

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

  const { isAddQuizSideDrawerOpen, toggleAddQuizSideDrawer } =
    useSideDrawerStore();

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Handle loading and error states
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (isLoading) {
    return <LoadingLayout />;
  }
  return (
    <div className="h-full min-h-screen bg-slate-200 ">
      <Container>
        <DashBoardMenu />
        <div className="pt-32 sm:pt-28">
          <SubHeader text="Latest Quizzes" size="small" />
        </div>
        <div
          className="space-x-1 space-y-6 pb-28 md:space-x-0 md:space-y-0 
          md:grid md:grid-cols-2 gap-6 lg:grid-cols-3 3xl:grid-cols-4 xl:gap-7"
        >
          {/* Wrap the QuizCard component with motion.div */}
          <AnimatePresence>
            {data &&
              data?.map((quiz: QuizData, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }} // Initial state (hidden)
                  animate={{ opacity: 1 }} // Animation state (visible)
                  transition={{ ease: "easeOut", duration: 0.4 }}
                  exit={{ opacity: 0 }} // Exit state (hidden)
                >
                  <QuizCard
                    topic={quiz?.quizTitle}
                    numQuestions={quiz?.numberOfQuestions}
                    numCorrectQuestions={quiz?.numberOfCorrectQuestions}
                    linkTo={`/dashboard/quiz/${quiz?._id}`}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <div className="">
          <SubHeader text="My Quizzes" size="small" />
        </div>
      </Container>
      <SideDrawer open={isAddQuizSideDrawerOpen} />
      <ScrollToTop />
    </div>
  );
};

export default DashboardLayout;
