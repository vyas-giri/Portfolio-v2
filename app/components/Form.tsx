"use client";

import React, { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import guestbookQueue, { enqueueGuestbookEntry, flushQueue } from '../lib/guestbookQueue';

type Props = {}

function Form({}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [queueCount, setQueueCount] = useState(0);
  const router = useRouter();

  // try flush on mount
  useEffect(() => {
    let mounted = true;
    
    // update queue count
    const updateCount = () => {
      const queued = guestbookQueue.getQueuedEntries();
      setQueueCount(queued.length);
    };
    
    updateCount();
    
    (async () => {
      try {
        const flushed = await flushQueue();
        if (mounted) {
          if (flushed) {
            console.log('✅ Successfully flushed queued guestbook entries');
          }
          updateCount();
          router.refresh();
        }
      } catch (e) {
        console.error('Flush error:', e);
      }
    })();

    // also run a periodic flush every 30s while the user is on the page
    const id = setInterval(async () => { 
      const flushed = await flushQueue();
      if (mounted) {
        updateCount();
        if (flushed) {
          console.log('✅ Background flush succeeded');
          router.refresh();
        }
      }
    }, 30_000);
    return () => { mounted = false; clearInterval(id); };
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form);
    const message = (fd.get('entry') as string) ?? '';
    const username = (fd.get('un_entry') as string) ?? 'Anonymous';

    if (!message.trim()) {
      alert('Please write a message');
      return;
    }

    setPending(true);

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, username }),
      });

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      
      // success: reset form and refresh page to show latest entries
      form.reset();
      
      // if fallback was used, show a note but still refresh
      if (data.fallback) {
        console.log('Entry saved via fallback:', data.fallback);
      }
      
      router.refresh();
    } catch (err) {
      // fallback: enqueue locally for later retry
      enqueueGuestbookEntry({ username, message, createdAt: new Date().toISOString() });
      form.reset();
      setQueueCount(prev => prev + 1);
      alert('It seems the database is down. Don&apos;t worry, I saved your message locally and will try to send it later.');
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} style={{opacity: pending ? 0.7: 1}} className='relative flex flex-col items-center text-sm mb-5 space-y-2'>
        {queueCount > 0 && (
          <div className='w-full px-3 py-2 mb-2 text-xs bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-600 rounded text-yellow-800 dark:text-yellow-200'>
            ⏳ {queueCount} message{queueCount > 1 ? 's' : ''} pending — will retry automatically
          </div>
        )}
        <input 
        type='text' 
        placeholder='Leave your message...' 
        name='entry' 
        required 
        disabled={pending}
        className='pl-4 sm:pr-32 py-2 mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full border-neutral-400 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100' />
  <input 
  type='text'
  placeholder={"Who's it from?"}
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