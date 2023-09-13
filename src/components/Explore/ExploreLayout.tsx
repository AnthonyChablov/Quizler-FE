"use client";
import React from "react";
import Hero from "../Common/Hero/Hero";
import ExploreMenu from "./ExploreMenu/ExploreMenu";
import { fetchData } from "@/api/quizData";
import useSWR from "swr";
import { useExploreStore } from "@/store/useExploreStore";
import Container from "../Common/Container";

interface Quiz {
  title: string;
  // Add other properties as needed
}

const ExploreLayout: React.FC = () => {
  // Fetch quiz data from the API using useSWR
  const { data, error, isLoading } = useSWR(
    "https://quizzlerreactapp.onrender.com/api/quizzes",
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  // State for the search query
  const { searchQuery, setSearchQuery } = useExploreStore();

  // Filter the data based on the search query
  /* const filteredData = data
    ? data.filter((quiz: Quiz) =>
        quiz?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []; */

  return (
    <>
      <Hero
        title="🌟 Discover Exciting Quizzes "
        description="🌍 Dive into various topics, challenge your intellect, and discover new horizons."
      />
      <Container>
        <ExploreMenu />
      </Container>
    </>
  );
};

export default ExploreLayout;
