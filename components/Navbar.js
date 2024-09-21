import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import MoreMenu from "./MoreMenu";
import ThemeChanger from "./Toggler";

function MyLink(props) {
  let { href, children, ...rest } = props;
  return (
    <Link href={href ||""} {...rest}>
      {children}
    </Link>
  );
}

export const Navbar = () => {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const handleClick = () => {
    setActive(!active);
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <nav className="flex items-center z-40 justify-between transition-colors flex-wrap bg-white drop-shadow-xl p-1 dark:bg-black dark:text-white dark:transition-colors sticky top-0">
        <div className="flex items-center p-1.5 ml-5">
          <Link href="/" className="inline-flex items-center">
            <span className="text-xl font-bold uppercase tracking-wide">
              {theme === "light" ? (
                <img
                  style={{ width: "200px" }}
                  id="Learn_more"
                  src="/GS_logo_Black.svg"
                  alt="GSSoC logo light"
                />
              ) : (
                <img
                  style={{ width: "200px" }}
                  id="Learn_more"
                  src="/GS_logo_White.svg"
                  alt="GSSoC logo dark"
                />
              )}
            </span>
          </Link>
        </div>
        <button
          className="inline-flex p-2.5 hover:bg-orange-600 rounded xl:hidden text-grey-700 dark:text-white"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? " " : "hidden"
          }   w-full xl:inline-flex xl:flex-grow xl:w-auto text-center`}
        >
          <div className="flex flex-col xl:flex-row xl:ml-auto xl:w-auto items-center mr-4">
            <Link
              href="/"
              onClick={handleClick}
              className="xl:inline-flex xl:w-auto w-full px-2 py-2 text-center rounded text-grey-700 text-1xl font-medium mr-1 hover:text-primary_orange-0 dark:hover:text-primary_orange-0 hover:text-xl transition-all link link-underline link-underline-black"
            >
              ABOUT
            </Link>
            <Link
              href="/wob"
              onClick={handleClick}
              className="xl:inline-flex xl:w-auto w-full px-2 py-2 text-center rounded text-grey-700 text-1xl font-medium mr-1 hover:text-primary_orange-0 dark:hover:text-primary_orange-0 hover:text-xl transition-all link link-underline link-underline-black"
            >
              WOB
            </Link>
            <Link
              href="/project"
              onClick={handleClick}
              className="xl:inline-flex xl:w-auto w-full px-2.5 py-2 text-center rounded text-grey-700 text-1xl font-medium mr-1 hover:text-primary_orange-0 dark:hover:text-primary_orange-0 hover:text-xl transition-all link link-underline link-underline-black"
            >
              PROJECT
            </Link>
            <Link
              href="/sponsorUs"
              onClick={handleClick}
              className="xl:inline-flex xl:w-auto w-full px-2.5 py-2 text-center rounded text-grey-700 text-1xl font-medium mr-1 hover:text-primary_orange-0 dark:hover:text-primary_orange-0 hover:text-xl transition-all link link-underline link-underline-black"
            >
              SPONSOR US
            </Link>
            <Link
              href="/leaderboard"
              onClick={handleClick}
              className="xl:inline-flex xl:w-auto w-full px-2.5 py-2 text-center rounded text-grey-700 text-1xl font-medium mr-1 hover:text-primary_orange-0 dark:hover:text-primary_orange-0 hover:text-xl transition-all link link-underline link-underline-black"
            >
              LEADERBOARD
            </Link>
            <Link
              href="/team"
              onClick={handleClick}
              className="xl:inline-flex xl:w-auto w-full px-2.5 py-2 text-center rounded text-grey-700 text-1xl font-medium mr-1 hover:text-primary_orange-0 dark:hover:text-primary_orange-0 hover:text-xl transition-all link link-underline link-underline-black"
            >
              TEAM
            </Link>
            <div className="xl:inline-flex xl:w-auto w-full px-2 text-center rounded">
              <MoreMenu handleClick={handleClick} />
            </div>
            <div className="hidden xl:block">
              <Tooltip label="Change Theme" placement="bottom">
                <div>
                  <ThemeChanger />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
