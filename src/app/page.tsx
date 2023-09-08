import Image from 'next/image';
import Hero from '@/components/Home/Hero';
import FeaturesSection from '@/components/Home/Features';
import Footer from '@/components/Home/Footer';

export default function Home() {
  return (
    <>
      <Hero/>
      <FeaturesSection/>
      <Footer/>
    </>
  )
}
