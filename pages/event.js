/* 
IMPORTANT NOTE FOR DEVELOPERS WORKING ON THIS PAGE ⚠
======================================================================================

THIS PAGE USES REACT-CHRONO TO RENDER TIMELINES
https://github.com/prabhuignoto/react-chrono

ALL THE DATA RENDERED IN THIS FILE ARE FETCCHED FROM "./api/event_data" FILE.

NOTE:
======================================================================================
THE DATE MUST HAVE THE KEY VALUE OF "title", TO REDNER IT AS A SEPERATE COMPONENT, AND ITS MANDATORY.

THEMING THE CHRONO-COMPONENT WILL TAKE EFFECT IN BOTH THE DARK AND LIGHT MODES OF NEXT-THEME.

TAILWIND DARK CLASSES WILL ONLY TAKE EFFECT INSIDE THE ACTUAL CHRONO-COMPONENT, SO IT'S NOT POSSIBLE TO CHANGE THE CHRONO-COMPONENT BASE COLORS WITH TAILWINDCSS.

I'VE USED NEUTRAL COLOR THEMES FOR BASE CHRONO COMPONENT, SO THAT IT DOESN'T ODD OUT ON BOTH DARK AND LIGHT THEMES.
*/

import { useTheme } from "next-themes";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";
import Eventdata from "./api/event_data";

const Event = () => {
  const [Event] = useState(Eventdata);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="wrapper">
      <Head>
        <title>Events | GirlScript Summer of Code 2024 | GirlScript Foundation India</title>
        <meta name="description" content="GirlScript Summer of Code Certificates" />
      </Head>

      <p className="text-primary_orange-0 dark:text-white font-sans text-3xl md:text-5xl text-center font-extrabold flex flex-col md:flex-row justify-center mb-10 underline decoration-orange-500 underline-offset-8">
        <h1 className="text-primary_orange-0">Events in&nbsp;</h1>
        <h1>GSSoC&apos;24</h1>
      </p>

      {/* Desktop view */}
      <div className="hidden md:block w-full">
        <Chrono
          items={Event}
          theme={{
            primary: "#f67621",
            secondary: "#f67621",
            cardBgColor: theme === "dark" ? "#474747" : "#f67621",
            cardForeColor: "white",
            titleColor: "white",
          }}
          hideControls={true}
          mode="VERTICAL_ALTERNATING"
          cardHeight={350}
        >
          <div className="chrono-icons">
            {[...Array(8)].map((_, i) => (
              <img
                key={i}
                src="https://img.icons8.com/material/344/start.png"
                alt="icon"
                className="w-6 h-6"
              />
            ))}
          </div>

          {Event.map((curEvent, i) => (
            <div className="wrapper font-sans w-full text-center" key={i}>
              {curEvent.fmt === "video" ? (
                <iframe
                  className="w-full h-80"
                  src={curEvent.poster}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img className="w-full h-80 object-cover" src={curEvent.poster} alt="poster" />
              )}

              <figcaption className="text-white text-2xl font-bold font-sans text-center mt-2">
                {curEvent.maintitle}
              </figcaption>

              <div>
                <p className="text-white text-md text-center mt-1">{curEvent.info}</p>
              </div>

              <div className="text-center mt-2">
                <a
                  className="text-orange-400 text-lg font-semibold hover:text-white"
                  href={curEvent.rec_link}
                >
                  Link here »
                </a>
              </div>
            </div>
          ))}
        </Chrono>
      </div>

      {/* Mobile view */}
      <div className="md:hidden w-full">
        <Chrono
          items={Event}
          theme={{
            primary: "#f67621",
            secondary: "#f67621",
            cardBgColor: theme === "dark" ? "#474747" : "#f67621",
            cardForeColor: "white",
            titleColor: "white",
          }}
          hideControls={true}
          mode="VERTICAL"
          cardHeight={350}
        >
          <div className="chrono-icons">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                className="p-[2px] w-6 h-6"
                src="https://img.icons8.com/material/344/start.png"
                alt="icon"
              />
            ))}
          </div>

          {Event.map((curEvent, i) => (
            <div className="wrapper font-sans w-full text-center" key={i}>
              {curEvent.fmt === "video" ? (
                <iframe
                  className="w-full h-80"
                  src={curEvent.poster}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img className="w-full h-80 object-cover" src={curEvent.poster} alt="poster" />
              )}

              <figcaption className="text-white text-2xl font-bold font-sans mt-2">
                {curEvent.maintitle}
              </figcaption>

              <div>
                <p className="text-white text-md mt-1">{curEvent.info}</p>
              </div>

              <div className="mt-2">
                <a
                  className="text-orange-400 text-lg font-semibold hover:text-white"
                  href={curEvent.rec_link}
                >
                  Link here »
                </a>
              </div>
            </div>
          ))}
        </Chrono>
      </div>
    </div>
  );
};

export default Event;
