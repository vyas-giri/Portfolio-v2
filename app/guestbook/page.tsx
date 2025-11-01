import React from 'react'
import Form from '../components/Form'
import prisma from '../db';


async function getEntries() {
    try {
        const data = await prisma?.guestbook.findMany({
            take: 50,
            orderBy: {
                created_at: "desc",
            },
        });

        return data || [];
    } catch (err) {
        console.error('Failed to fetch guestbook entries:', err);
        return [];
    }
}

type Props = {}

export const revalidate = 60;

async function GuestBook({}: Props) {
    const data = await getEntries()

  return (
    <div className='divide-y divide-amber-600 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
            <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-10'>
                Guestbook
            </h1>
        </div>

        <div className='w-full'>
            <div className='max-w-[500px] mx-auto mt-8'>
                <Form />

                <div className='flex flex-col space-y-2 mt-8'>
                    {data.length === 0 && (
                        <p className='text-sm text-gray-500 dark:text-gray-400 italic'>
                            No entries yet. Be the first to leave a message!
                        </p>
                    )}
                    {data.map((entry) => (
                        <div key={entry.id} className='w-full text-sm break-words'>
                           <span className='dark:text-cyan-500 text-teal-600 text-lg'>{entry.username}</span>: {entry.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default GuestBook