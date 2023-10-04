import React from "react";
import Icons from "@/components/Common/Icons";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", iconType: "home", iconSize: 25 },
  { href: "/dashboard/explore", iconType: "explore", iconSize: 28 },
  { href: "/dashboard/profile", iconType: "user", iconSize: 28 },
];

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-50 shadow-2xl py-2 px-4 w-full border-t-2">
      <div className="max-w-screen-sm flex justify-between mx-auto items-center">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="text-gray-600 hover:text-gray-900">
              <Icons
                type={item.iconType}
                size={item.iconSize}
                color="#7861f3"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
