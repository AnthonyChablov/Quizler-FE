import React, { useEffect, useState } from "react";
import Icons from "../Icons";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 250) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          className="fixed bottom-16 right-5 bg-gradient-to-r from-indigo-500  to-purple-500 text-white
          hover:brightness-75 rounded-full p-6 focus:outline-none shadow-2xl "
          onClick={scrollToTop}
        >
          <Icons type="up" size={25} color="white" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
