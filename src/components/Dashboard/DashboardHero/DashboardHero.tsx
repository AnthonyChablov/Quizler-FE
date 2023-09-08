'use client'
import React from 'react';
import Container from '@/components/Common/Container';
import '@/styles/animations.css';

const DashboardHero = () => {
  return (
    <section className="text-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-2xl shadow-lg animate-gradientAnimation duration-3000 h-fit ">
      {/* Apply the animation class here */}
      <Container>
        <div className="pt-10 xs:pt-12">
          <h1 className="text-white text-3xl font-bold">
            🚀 Test Your Knowledge!
          </h1>
          <p className="text-white text-sm md:text-lg mt-3 pb-28">🧠 
            Get ready to embark on an epic journey of discovery and learning.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default DashboardHero;
