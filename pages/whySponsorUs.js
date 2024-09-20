import React from "react";
import Link from "next/link";
import Head from "next/head";

function WhySponsorUs() {
  return (
    <>
      <Head>
        <title>
          Why Sponsor Us | GirlScript Summer of Code 2024 | GirlScript
          Foundation India
        </title>
        <meta
          name="description"
          content="Why Sponsor Us of GirlScript Summer of Code"
        />
      </Head>
      <div className="w-full h-full relative">
        <div className="flex flex-col items-center mx-auto relative w-full py-12 px-3 sm:px-5 lg:px-7">
          <h2 className="text-xl underline sm:text-3xl lg:text-4xl font-bold text-center text-primary_orange-0 max-sm:text-3xl sm:max-sm:text-4xl lg:max-sm:text-3xl">
            Why Sponsor Us?
          </h2>
          <p className="text-sm sm:text-md lg:text-lg text-left text-gray-700 max-sm:text-lg sm:max-sm:text-xl lg:max-sm:text-xl mt-12 max-w-7xl dark:text-white">
            <span className="text-primary_orange-0 font-bold">
              GirlScript Summer of Code (GSSoC)
            </span>{" "}
            is an open-source program organized by the{" "}
            <span className="text-primary_orange-0 font-bold">
              GirlScript Foundation
            </span>
            . Launched in 2018, GSSoC aims to introduce beginners to open-source
            development while fostering diversity in tech.
          </p>

          <p className="text-sm sm:text-md lg:text-lg text-left text-gray-700 max-sm:text-lg sm:max-sm:text-xl lg:max-sm:text-2xl mt-3 max-w-7xl dark:text-white">
            With a track record of engaging thousands of contributors, mentors,
            and project admins across the globe, GSSoC offers unparalleled
            opportunities for sponsors to gain significant visibility and
            connect with a passionate community of developers and tech
            enthusiasts. By sponsoring GSSoC, you align your brand with
            innovation, diversity, and the future of technology.{" "}
            <strong>Visit:</strong>{" "}
            <Link href="/sponsorUs">
              <span className="text-primary_orange-0 font-bold cursor-pointer hover:underline">
                Sponsor Us
              </span>
            </Link>
          </p>

          {/* Two-column section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8 max-w-7xl">
            {/* Left Column */}
            <div className="text-left">
              <h3 className="text-xl lg:text-xl font-bold text-primary_orange-0 mb-4">
                Our Reach
              </h3>
              <ul className="list-disc list-outside space-y-4 ml-4">
                <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                  Global Impact: GSSoC extends its reach across the Indian
                  subcontinent, the USA, Africa, and 17+ countries. Our vast
                  network spans multiple regions, ensuring your brand gets
                  noticed by a diverse and international audience.
                </li>
                <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                  Target Audience: Engage with a dynamic group of young
                  developers, women in tech, and various tech and open-source
                  communities. Our program attracts the brightest minds and
                  promotes inclusivity in tech.
                </li>
                <li className="text-sm sm:text-md lg:text-md dark:text-white">
                  <span className="text-primary_orange-0 font-bold">
                    Demographics
                  </span>
                  <ul className="list-outside list-[circle] pl-4 space-y-4">
                    <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                      <span className="font-bold">
                        50% Women Participation:
                      </span>{" "}
                      Demonstrating our commitment to gender diversity.
                    </li>
                    <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                      <span className="font-bold">
                        1000+ Colleges Participated:
                      </span>{" "}
                      Engaging with educational institutions globally.
                    </li>
                    <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                      <span className="font-bold">35K+ Audience:</span> Access
                      top talent from our extensive pool of participants.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="flex justify-center items-center">
              <img
                src="./whySponsorUS/map.png"
                alt="GSSoC Image"
                className="w-full h-auto max-w-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 mt-16 max-w-7xl">
            {/* Left Column */}
            <div className="flex justify-center items-center max-sm:hidden">
              <img
                src="./whySponsorUS/site_stats.png"
                alt="GSSoC Image"
                className="w-full h-auto max-w-md"
              />
            </div>
            {/* Right Column */}
            <div className="text-left">
              <h3 className="text-xl lg:text-xl font-bold text-primary_orange-0 mb-4">
                Brand Exposure
              </h3>
              <ul className="list-disc list-outside space-y-4 ml-4">
                <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                  <span className="font-bold">100K+ Live Engagements: </span>{" "}
                  More than 100K viewers tuned into our YouTube live sessions,
                  with an additional 80K+ watching later.
                </li>
                <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                  <span className="font-bold">
                    70K Social Media Followers:{" "}
                  </span>{" "}
                  Our social media handles have over 15K+ students following,
                  with more than 300K views on posts and 60K+ clicks on the
                  GSSoC website.
                </li>
                <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                  <span className="font-bold">Newsletter Access: </span> Feature
                  your brand in our newsletter sent to over 15,800 subscribers.
                  Sponsorship opportunities are available for our newsletters
                  delivered every second Saturday.
                </li>
              </ul>
            </div>
          </div>

          {/* Two-column section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8 max-w-7xl">
            {/* Left Column */}
            <div className="text-left">
              <h3 className="text-xl lg:text-xl font-bold text-primary_orange-0 mb-4">
                Workshops & Speaker Opportunities
              </h3>
              <ul className="list-disc list-outside space-y-4 ml-4 mb-12">
                <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                  Sponsor-led workshops provide a platform for your company to
                  showcase expertise and connect directly with the community.
                  You can also recommend speakers to engage with participants.
                </li>
              </ul>
              <h3 className="text-xl lg:text-xl font-bold text-primary_orange-0 my-4">
                Exclusive Recruitment Potential
              </h3>
              <ul className="list-disc list-outside space-y-4 ml-4">
                <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                  Discover and hire top talent from our pool of 35K+
                  participants. Gain exclusive access to interview and recruit
                  the best performers and developers.
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="flex justify-center items-center">
              <img
                src="./whySponsorUS/team.png"
                alt="GSSoC Image"
                className="w-full h-auto max-w-md lg:-mt-24"
              />
            </div>
          </div>

          {/* Two-column section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-24 max-w-7xl">
            {/* Left Column */}
            <div className="text-left">
              <h3 className="text-xl lg:text-xl font-bold text-primary_orange-0 mb-4">
                Join Us
              </h3>
              <ul className="list-disc list-outside space-y-4 ml-4 mb-12">
                <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                  Sponsoring{" "}
                  <span className="text-primary_orange-0 font-bold">GSSoC</span>{" "}
                  provides an exceptional opportunity to enhance your
                  brand&apos;s visibility, connect with emerging tech talent,
                  and support a program dedicated to open-source innovation and
                  diversity. Partner with us to make a meaningful impact and
                  drive your brand&apos;s presence in the tech community
                  worldwide.
                </li>
                <li className="text-sm sm:text-md lg:text-md text-gray-700 dark:text-white">
                  For sponsorship inquiries and to learn more about how you can
                  get involved, please contact us at{" "}
                  <a
                    href="mailto:gssoc@girlscript.tech"
                    className="hover:underline text-primary_orange-0 dark:text-white"
                  >
                    gssoc@girlscript.tech
                  </a>
                  .
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="flex justify-center items-center -mt-24">
              <img
                src="./whySponsorUS/join.png"
                alt="GSSoC Image"
                className="w-full h-auto max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhySponsorUs;
