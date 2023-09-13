import React from "react";
import { useExploreStore } from "@/store/useExploreStore";

const ExploreMenu = () => {
  // State for the search query
  const { searchQuery, setSearchQuery } = useExploreStore();

  return (
    <div
      className="absolute top-48 sm:top-38 md:top-38 left-1/2 transform -translate-x-1/2 bg-slate-50 w-3/4 
      max-w-xl px-8 py-6 rounded-xl shadow-xl"
    >
      <div className="flex items-center justify-between pb-4">
        <h2 className="font-semibold text-md sm:text-lg md:text-lg mb-2">
          {"Discover new Quizzes"}
        </h2>
      </div>
      <p className="text-gray-700 text-left text-sm">
        Discover new Quizzes
        <div className="p-4">
          <input
            type="text"
            placeholder="Search for quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
      </p>
    </div>
  );
};

export default ExploreMenu;
