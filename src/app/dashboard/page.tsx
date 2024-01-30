import React from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import BottomNav from '@/components/Dashboard/Navigation/BottomNav';

const page = () => {
  return (
    <div>
      <DashboardLayout />
      <BottomNav />
    </div>
  );
};

export default page;
