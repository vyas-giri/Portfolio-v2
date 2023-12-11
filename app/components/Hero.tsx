"use client";

import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import BackgroundCircles from './BackgroundCircles';


type Props = {}

function Hero({}: Props) {
    const [text, count] = useTypewriter({
        words: [
          "Hey! My name is Vyas Giri",
          "guyWhoLovesToCode.tsx",
          "<FullStackDeveloper />",
          "{ aCaffeineAddictMaybe }",
          "but/a/tech/addict/more",
      ],
      loop: true,
      delaySpeed: 1000,
      })

  return (
    <div className='flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
        <h3 className='pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight text-gray-500 dark:text-white'>
            <span>{text}</span>
            <Cursor cursorColor="#F7AB0A" />
            </h3>
    </div>
  )
}

export default Hero