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
        ? 'Card me dikhega'
        : text.slice(0, 150);

  return (
    <div className='prose max-w-none prose-lg pt-8 pb-7 dark:prose-invert xl:col-span-2'>
          <p>Hello there! I am Vyas, a sophomore at Indian Institute of Technology (BHU), Varanasi. A Full Stack developer originally based in Delhi, India.</p>
          <p className={`${showFullInfo ? "line-clamp-none" : "line-clamp-3"}`}>
            I am experienced and proficient in building full stack web applications. I am a huge tech enthusiast and I constantly explore in this domain. I am constantly learning new things because of my deep passion in this field. I just love the fact that I can create something from the scratch and add my own unique creativity to it and show it to the world.
          </p>
          <p className={`${showFullInfo ? "block" : "hidden"}`}>I also regularly contribute to open source projects and always stay on the hunt to find projects aligning with my skills. I love connecting with new people and open source has helped me with that a lot. </p>

          <span className='text-center text-cyan-500 cursor-pointer hover:text-emerald-500' onClick={showFullInfoHandler}>{showFullInfo ? "Show less" : "Read more"}</span>
        </div>
  )
}

export default MyInfo