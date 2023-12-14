"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Hamburger from "./hamburgerMenu";
import ThemeButton from "./Themebutton";

export default function Navbar () {
    let pathname = usePathname() || "/"

    return (
                <>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex justify-between w-full">
                            <div className="flex items-center">
                                <Link href={"/"}>
                                    <h1 className="text-2xl font-medium tracking-wider">
                                        VYAS <span className="text-teal-500 tracking-wider">GIRI</span>
                                    </h1>
                                </Link>
                            </div>

                            <div className="hidden sm:flex sm:ml-6 sm:space-x-8 sm:items-center">
                                <Link href={"/"} prefetch className={`${pathname === "/" ? 'border-teal-500 dark:text-white h-full inline-flex items-center font-medium px-1 border-b-2 text-sm pt-1' : 'border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}`}>Home
                                </Link>
                                <Link href={"/guestbook"} prefetch className={`${pathname === "/guestbook" ? 'border-teal-500 dark:text-white h-full inline-flex items-center font-medium px-1 border-b-2 text-sm pt-1' : 'border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}`}>Guestbook
                                </Link>
                                <Link href={"/projects"} prefetch className={`${pathname === "/projects" ? 'border-teal-500 dark:text-white h-full inline-flex items-center font-medium px-1 border-b-2 text-sm pt-1' : 'border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}`}>Projects
                                </Link>
                                <ThemeButton />
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden space-x-2 z-50">
                            <ThemeButton />
                            <Hamburger />
                        </div>
                    </div>

                </div>
                </>
    )
}