import React from 'react';
import Icons from '@/components/Common/Icons';
import Link from 'next/link';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-50 shadow-2xl  py-2 px-4  
         w-full border-t-2
    ">
        <div className="max-w-screen-sm flex justify-between mx-auto items-center">
            <Link href="/dashboard">
                <div className="text-gray-600 hover:text-gray-900">
                <Icons type="home" size={25} color="#7861f3" />
                </div>
            </Link>
            <Link href="/dashboard/explore">
                <div className="text-gray-600 hover:text-gray-900">
                <Icons type="explore" size={28} color="#7861f3" />
                </div>
            </Link>
            <Link href="/dashboard/profile">
                <div className="text-gray-600 hover:text-gray-900">
                <Icons type="user" size={28}  color='#7861f3'/>
                </div>
            </Link>
        </div>
    </div>
  );
}

export default BottomNav;
