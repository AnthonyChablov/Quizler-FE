import React from 'react'
import DashboardHero from '@/components/Dashboard/DashboardHero/DashboardHero'
import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import BottomNav from '@/components/Dashboard/Navigation/BottomNav'

const page = () => {
  return (
    <div>
      <DashboardHero/>
      <DashboardLayout/>
      <BottomNav/>
    </div>
  )
}

export default page