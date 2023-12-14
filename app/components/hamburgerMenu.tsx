import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { usePathname } from 'next/navigation';

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/"
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const [homeColor, setHomeColor] = useState('#A81F25');
  const [guestbookColor, setGuestbookColor] = useState('#00ffff');
  const [projectsColor, setProjectsColor] = useState('#00ffff');

  useEffect(() => {
    if (pathname === '/') {
      setHomeColor('reddish');
      setGuestbookColor('cyan-500');
      setProjectsColor('cyan-500');
    } else if (pathname === '/guestbook') {
      setHomeColor('cyan-500');
      setGuestbookColor('reddish');
      setProjectsColor('cyan-500');
    } else if (pathname === '/projects') {
      setHomeColor('cyan-500');
      setGuestbookColor('cyan-500');
      setProjectsColor('reddish');
    }
  }, [pathname]);

  const navLinks = [
    { color: homeColor, title: 'Home', href: '/' },
    { color: guestbookColor, title: 'Guestbook', href: '/guestbook' },
    { color: projectsColor, title: 'Projects', href: '/projects' },
  ];


  return (
    <header className='z-50'>
      <div className='text-md text-slate-700 dark:text-white cursor-pointer' onClick={toggleMenu}>
        <HamburgerIcon boxSize={28} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial='initial'
            animate='animate'
            exit='exit'
            className='dark:text-white text-black bg-slate-400 fixed left-0 top-0 z-50 h-screen w-full origin-top dark:bg-[#191919] p-10'
          >
            <div className='flex h-full flex-col z-50'>
              <p className='cursor-pointer' onClick={toggleMenu}>
                <CloseIcon boxSize={28} />
              </p>
              <motion.div
                variants={containerVars}
                initial='initial'
                animate='open'
                exit='initial'
                className='flex h-full flex-col items-center justify-center gap-5 z-50'
              >
                <motion.div variants={mobileLinkVars}>
                </motion.div>
                {navLinks.map((link, index) => {
                  return (
                    <div className='overflow-hidden z-50' key={index}>
                      <button onClick={toggleMenu}>
                      <MobileNavLink
                        key={index}
                        title={link.title}
                        href={link.href}
                        color={link.color}
                      />
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Hamburger;

const mobileLinkVars = {
  initial: {
    y: '30vh',
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};
const MobileNavLink = ({
  color,
  title,
  href,
}: {
  color: any;
  title: string;
  href: string;
}) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className={`text-${color} text-3xl uppercase`}
    >
      <Link className={`text-${color} text-3xl uppercase`} href={href}>
        {title}
      </Link>
    </motion.div>
  );
};