"use client";

import React, { useRef } from 'react'
import { postEntry } from '../action';
import { useFormStatus } from 'react-dom';

type Props = {}

function Form({}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const {pending} = useFormStatus();

  return (
    <form action={async (FormData) => {
      await postEntry(FormData);
      formRef.current?.reset();
    }} 
    ref={formRef} 
    style={{opacity: pending ? 0.7: 1}}
    className='relative flex flex-col items-center text-sm mb-5 space-y-2'>
        <input 
        type='text' 
        placeholder='Leave your message...' 
        name='entry' 
        required 
        disabled={pending}
        className='pl-4 pr-32 py-2 mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full border-neutral-400 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100' />
        <input 
        type='text'
        placeholder='Who&apos;s it from?'
        name='un_entry'
        className='pl-4 pr-4 py-2 mt-1 focus:ring-teal-500 focus:border-teal-500  w-44 text-center border-neutral-400 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
         />
        <button type="submit" className='flex items-center justify-center right-2 mt-1 font-medium bg-teal-500/30 h-7 text-neutral-900 dark:text-neutral-100 rounded w-16 dark:hover:bg-teal-900 hover:bg-cyan-300'>
            Send
        </button>
    </form>
  )
}

export default Form