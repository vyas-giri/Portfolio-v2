"use client";
import Image from 'next/image'
import SocialLinks from './components/socialLinks';
import Hero from './components/Hero';
import BackgroundCircles from './components/BackgroundCircles';
import MyInfo from './components/MyInfo';
import Skills from './components/Skills';
import Link from 'next/link';

export default function Home() {
  

  return (
    <div className='snap-y snap-mandatory snap-center scroll-smooth -z-10'>
    <section id='about_me' className='pb-[102rem] sm:pb-[70rem] md:pb-[60rem] xl:pb-20 md:mb-32'>
    <div className='divide-y divide-amber-600 dark:divide-gray-700'>
      <div className='space-y-2 pt-5 pb-8 md:space-x-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-[15px] text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-10'>
          Home
        </h1>
      </div>

      <div className='items-center space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
        <div className='flex flex-col items-center pt-8 space-y-2'>
          {/* <BackgroundCircles /> */}
          <Image alt='me' className='h-48 w-48 rounded-full object-cover object-left-top' src={"/me.webp"} width={400} height={200} />
          <section id='hero' className='snap-center -z-10'>
            <Hero />
          </section>
          <SocialLinks />
          <Link href={"/resume_vyas.pdf"} target='_blank' className='rounded-l-2xl rounded-r-2xl border-2 border-amber-500 p-3 hover:border-teal-500 text-teal-500 hover:text-amber-500 px-10 lg:text-xl'>CV</Link>
        </div>

        <MyInfo />
      </div>
    </div>
    </section>
    <section id='skills' className='h-screen snap snap-y snap-center snap-mandatory self-center relative flex flex-col justify-center'>
      <div className='divide-y divide-amber-600 dark:divide-gray-700'>
      <div className='space-y-2 pt-5 pb-4 md:space-x-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-10 md:ml-10'>
          Skills and tools I use
        </h1>
      </div>
    <Skills />
    </div>
    </section>
    </div>
  )
}
