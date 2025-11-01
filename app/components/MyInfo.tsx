import React, { useState } from 'react'

type Props = {}

function MyInfo({}: Props) {
    const [showFullInfo, setShowFullInfo] = useState(false);

    const text = ["I am constantly learning new thing because of my deep passion in this field. I just love the fact that I can create something from the scratch and add my own unique creativity to it and show it to the world."]
    const text2 = ["I also regularly contribute to open source projects and always stay on the hunt to find projects aligning with my skills. I love connecting with new people and open source has helped me with that a lot. "]

    const showFullInfoHandler = () => {
        setShowFullInfo(!showFullInfo);
      };
      const description = showFullInfo
        ? ''
        : text.slice(0, 150);

  return (
    <div className='prose max-w-none prose-lg pt-8 pb-7 dark:prose-invert xl:col-span-2'>
          <p>Hello there! I am <span className='text-amber-600 dark:text-cyan-500'>Vyas</span>, a <span className='dark:text-cyan-500'>4th year</span>  undergraduate at <a className='text-amber-600 dark:text-cyan-500 no-underline' href='https://iitbhu.ac.in/' target='_blank'>Indian Institute of Technology (BHU), Varanasi</a>. A <span className='text-amber-600 dark:text-cyan-500'>Full Stack developer</span> originally based in <span className='text-amber-600 dark:text-cyan-500'>Delhi, India</span>.</p>
          <p className={`${showFullInfo ? "line-clamp-none" : "line-clamp-3"}`}>
            I am experienced and <span className='dark:text-emerald-500 text-red-800'>proficient in building full stack web applications</span>. I like to learn about new technologies and create creative projects. I also love to <span className='dark:text-emerald-500 text-red-800'>contribute to open source projects.</span>
          </p>
          <p>Currently, I am learning DSA and practicing problem-solving skills. I am also building a new project which is basically git but with less functionalities. I will be creating my own git from scratch.</p>
          <span>You can take a look at my other projects on the Projects (/projects) page. </span>
          <span>You can leave a message for me in the Guestbook (/guestbook).</span>
        </div>
  )
}

export default MyInfo