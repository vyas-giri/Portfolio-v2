import React from 'react'
import { client } from '../lib/sanity';
import Image from 'next/image';

interface Data {
  title: string;
  overview: string;
  link: string;
  github_link: string;
  _id: string;
  imageUrl: string;
}

async function getProjects() {
  const query = `*[_type == "project"] {
    title,
      overview,
      link,
      github_link,
      _id,
      "imageUrl": image.asset->url}`;

      const data = await client.fetch(query);
      return data;
  }

  export const revalidate = 60;

type Props = {}

async function Projects({}: Props) {
  const data: Data[] = await getProjects();

  return (
    <div className='divide-y divide-amber-600 dark:divide-gray-700 mb-10'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
            <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl'>
                All Projects
            </h1>
        </div>

        <div className='grid gap-y-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10 pt-8'>
          {data.map((project) => (
            <article 
            key={project._id}
            className='overflow-hidden dark:border-zinc-600 rounded-lg shadow-lg dark:bg-black dark:shadow-gray-700 shadow-teal-100 border border-gray-700 bg-white'>
              <div className='h-56 w-full relative'>
              <Image alt='project-image' src={project.imageUrl} width={500} height={500} className='w-full h-full object-cover' />
              </div>

              <div className='p-4 sm:p-6'>
                <a href={project.link} target='_blank'>
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
                    {project.title}
                  </h3>
                </a>

                <p className='line-clamp-2 mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
                  {project.overview}
                </p>

                <div>
                <a href={project.github_link} target='_blank' className='group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-500'>
                <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      className='w-8 h-8 dark:text-[#59daff] text-slate-700 hover:text-teal-800 dark:hover:text-teal-600'
    >
      <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
    </svg>
                  <span className='block transition-all group-hover:ms-1'>
                    &rarr;
                  </span>
                </a>
                <a className='group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-500 float-right rounded-full' href={project.link} target='_blank'>
                <span className='block transition-all group-hover:me-1'>
                    &larr;
                  </span>
                <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className='w-8 h-8 dark:text-[#59daff] text-slate-700 hover:text-teal-800 dark:hover:text-teal-600'
    >
      <path d="M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 019.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 015.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 00-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" />
    </svg>
    </a>
                </div>
              </div>
            </article>
          ))}
        </div>
    </div>
  )
}

export default Projects