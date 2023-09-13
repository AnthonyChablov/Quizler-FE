import React from "react";
import BottomNav from "@/components/Dashboard/Navigation/BottomNav";
import ExploreLayout from "@/components/Explore/ExploreLayout";

const page = () => {
  return (
    <div>
      <ExploreLayout />
      <BottomNav />
    </div>
  );
};

export default page;
