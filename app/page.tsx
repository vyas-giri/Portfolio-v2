"use client";
import Image from 'next/image'
import SocialLinks from './components/socialLinks';
import Hero from './components/Hero';
import BackgroundCircles from './components/BackgroundCircles';
import MyInfo from './components/MyInfo';

export default function Home() {
  

  return (
    <div className='divide-y divide-gray-300 dark:divide-gray-700 h-screen snap-y snap-mandatory'>
      <div className='space-y-2 pt-5 pb-8 md:space-x-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-10'>
          Home
        </h1>
      </div>

      <div className='items-center space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
        <div className='flex flex-col items-center pt-8 space-y-2'>
          {/* <BackgroundCircles /> */}
          <Image alt='me' className='h-48 w-48 rounded-full object-cover object-left-top' src={"/me.webp"} width={400} height={200} />
          <section id='hero' className='snap-center'>
            <Hero />
          </section>
          <SocialLinks />
        </div>

        <MyInfo />
      </div>
    </div>
  )
}
