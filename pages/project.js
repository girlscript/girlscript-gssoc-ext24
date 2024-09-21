// import { Search2Icon } from "@chakra-ui/icons";
// import { SimpleGrid, Spacer } from "@chakra-ui/react";
// import { useTheme } from "next-themes";
// import Head from "next/head";
// import React, { useCallback, useEffect, useState } from "react";
// import ProjectModal from "../components/ProjectModal";
// import { projectData } from "./api/projectsData";
// import SearchTags from "../components/SearchTags";

// const projectLinks = {
//   2024: "https://opensheet.elk.sh/1JiqHjGyf43NNkou4PBe7WT4KEyueuFJct2p322nNMNw/JSON",
//   2023: "https://opensheet.elk.sh/1v7VqK6i_xJK4nJ6GKzoeafwrnlJR8Y5-8v0Qfsh3gqo/Shortlisted",
//   2022: "https://opensheet.elk.sh/1OC5gOWCpUrDXI8HAPEM9iOohoznBfAVF9d-rSMO7FXM/JSON_EndPoint",
//   2021: projectData,
// };

// const Project = () => {
//   // const [data, setData] = useState(projectData);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [mounted, setMounted] = useState(false);
//   const [year, setYear] = useState("24");
//   const { theme } = useTheme();

//   const getProjects = useCallback(async (year) => {
//     if (year === "2021") {
//       setData(projectLinks[year]);
//     } else if (year === "2024") {
//       const res = await fetch(
//         "https://gssoc-leaderboard.vercel.app/api/projects"
//       );
//       const projects = await res.json();
//       setData(projects.projects);
//     } else {
//       const response = await fetch(projectLinks[year]);
//       setData(await response.json());
//     }
//     setYear(year.substring(2));
//   }, []);

//   useEffect(() => {
//     setMounted(true);
//     getProjects("2024");
//   }, []);

//   if (!mounted) return null;
//   // const [isOpen, setIsOpen] = React.useState(false)
//   // const onClose = () => setIsOpen(false)
//   // const cancelRef = React.useRef()
//   console.log(data);
//   return (
//     <>
//       <Head>
//         <title>
//           Projects | GirlScript Summer of Code 2024 | GirlScript Foundation
//           India
//         </title>
//         <meta
//           name="description"
//           content="Projects of GirlScript Summer of Code"
//         />
//         {/* <link
//           rel="icon"
//           href="https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png"
//         /> */}
//       </Head>
//       <section>
//         <div className="flex flex-col md:flex-row justify-between items-center px-24 w-full">
//           <div className="flex flex-col md:flex-row wrap items-center justify-between w-full gap-2">
//             <p className="text-primary_orange-0 dark:text-white font-sans text-3xl md:text-5xl text center font-extrabold flex wrap justify-start flex-col md:flex-row">
//               <h1 className="text-primary_orange-0">Projects&nbsp;</h1>
//               <h1>-&nbsp;GSSOC&apos;{year} </h1>
//             </p>
//             <div className="flex object-right border-b-2 items-center">
//               <Search2Icon color={theme === "light" ? "black" : "white"} />
//               <input
//                 className="px-3 py-1 bg-transparent outline-none dark:text-white text-black"
//                 type="search"
//                 placeholder="Search projects..."
//                 name="search"
//                 id="search"
//                 onChange={(event) => setSearchTerm(event.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//         <Spacer mt={16} />
//         <div className="flex flex-row justify-center flex-wrap items-center gap-5">
//           {Object.keys(projectLinks)
//             .reverse()
//             .map((year) => {
//               return (
//                 <button
//                   key={year}
//                   className="bg-gradient-to-b from-primary_orange-0 to-orange-600 text-lg dark:text-black rounded-b-md hover:bg-gradient-to-t hover:from-primary_orange-0 hover:to-orange-600 text-md text-white font-bold px-10 py-3 rounded md:text-2xl md:py-4"
//                   onClick={() => getProjects(year)}
//                 >
//                   {year}
//                 </button>
//               );
//             })}
//         </div>
//         {}
//         {data.length > 1 && (
//           <div>
//             <Spacer mt={10} mb={10} />
//             <SearchTags setSearchTerm={setSearchTerm} />
//             <Spacer mt={10} mb={10} />
//             <div
//               className="flex flex-row justify-center flex-wrap items-center 
//         gap-x-10 gap-y-10 mt-9"
//             >
//               {data
//                 .sort(() => 0.5 - Math.random())
//                 .filter((curElem, i) => {
//                   if (searchTerm == "") return curElem;
//                   if (
//                     curElem.technology_used
//                       .toLowerCase()
//                       .includes(searchTerm.toLowerCase()) ||
//                     curElem.project_name
//                       .toLowerCase()
//                       .includes(searchTerm.toLowerCase())
//                   )
//                     return curElem;
//                 })
//                 .map((curElem, i) => {
//                   return (
//                     <div
//                       className="flex items-center overflow-hidden justify-between w-80"
//                       key={i}
//                       data-aos="flip-up"
//                       data-aos-duration="800"
//                     >
//                       <div className="shadow dark:bg-black rounded-lg">
//                         <div
//                           className="rounded-lg h-fit md:h-80 
//                     w-80 flex flex-col justify-start 
//                     shadow-lg shadow-black-200 relative overflow-hidden"
//                         >
//                           <div className="flex flex-col items-start justify-start overflow-y-auto">
//                             <div className="flex flex-col justify-start gap-2 px-5 py-3">
//                               <div className="font-bold text-primary_orange-0 md:text-xl">
//                                 <a
//                                   target="_blank"
//                                   rel="noreferrer"
//                                   href={
//                                     curElem.project_link ||
//                                     curElem.github ||
//                                     "https://github.com/" +
//                                       curElem.repo_fullname
//                                   }
//                                 >
//                                   {i + 1}. {curElem.project_name}
//                                 </a>
//                               </div>
//                               <div className="mb-3 text-sm dark:text-white md:text-md md:mb-4">
//                                 By {curElem.owner_name}
//                               </div>
//                             </div>
//                             {year === "24" && (
//                               <div className="dark:text-gray-400 text-gray-700 flex flex-col justify-start gap-2 px-5 pb-3">
//                                 {curElem.stats.latestPullRequest?.mergedAt && (
//                                   <h1 className=" text-base font-semibold">
//                                     Latest PR merged At :{" "}
//                                     {curElem.stats.latestPullRequest.mergedAt.split('T')[0]}, {curElem.stats.latestPullRequest.mergedAt.split('T')[1].split('Z')[0]}
//                                   </h1>
//                                 )}
//                                 <h1 className=" text-base font-semibold">
//                                   Open Issues : {curElem.stats.openIssues}
//                                 </h1>
//                                 <h1 className=" text-base font-semibold">
//                                   Open PRs : {curElem.stats.openPullRequests}
//                                 </h1>
//                               </div>
//                             )}
//                             <SimpleGrid
//                               columns={{ sm: 2, md: 3 }}
//                               spacing={2}
//                               margin={1}
//                               className="px-2"
//                             >
//                               {curElem.technology_used
//                                 .split(",")
//                                 .sort((a, b) => a.length - b.length)
//                                 .map((techStk, k) => {
//                                   return (
//                                     techStk && (
//                                       <button
//                                         className="bg-orange-50 dark:hover:bg-slate-700 dark:bg-stone-800 rounded-2xl w-full py-1
//                                       text-orange-600 drop-shadow-md font-semibold"
//                                         key={k}
//                                         onClick={() => {
//                                           setSearchTerm(techStk.trim());
//                                         }}
//                                       >
//                                         {techStk.trim()}
//                                       </button>
//                                     )
//                                   );
//                                 })}
//                             </SimpleGrid>
//                           </div>
//                           <br />
//                           <br />
//                           <ProjectModal currProject={curElem} />
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         )}
//         <br />
//         <br />
//       </section>
//     </>
//   );
// };

// export default Project;

import { Search2Icon } from "@chakra-ui/icons";
import { SimpleGrid, Spacer } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import ProjectModal from "../components/ProjectModal";
import { projectData } from "./api/projectsData";
import SearchTags from "../components/SearchTags";

const projectLinks = {
  "2024-Extd": "add project list link here",
  2024: "https://opensheet.elk.sh/1JiqHjGyf43NNkou4PBe7WT4KEyueuFJct2p322nNMNw/JSON",
  2023: "https://opensheet.elk.sh/1v7VqK6i_xJK4nJ6GKzoeafwrnlJR8Y5-8v0Qfsh3gqo/Shortlisted",
  2022: "https://opensheet.elk.sh/1OC5gOWCpUrDXI8HAPEM9iOohoznBfAVF9d-rSMO7FXM/JSON_EndPoint",
  2021: projectData,
};

const Project = () => {
  // const [data, setData] = useState(projectData);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState("2024-Extd");
  const { theme } = useTheme();

  const getProjects = useCallback(async (year) => {
    if (year === "2021") {
      setData(projectLinks[year]);
      setYear(year.substring(2));   // remove this when full code when leaderboard display time
    } 
    else if(year === "2024-Extd") {   // remove this else if when leaderboard display time
      setYear("2024-Extd");
    } else {
      const response = await fetch(projectLinks[year]);
      setData(await response.json());
      setYear(year.substring(2));   // remove this when full code when leaderboard display time
    }
    // setYear(year.substring(2));  // uncomment this when full code when leaderboard display time
  }, []);

  useEffect(() => {
    setMounted(true);
    getProjects("2024-Extd");
  }, []);

  if (!mounted) return null;
  // const [isOpen, setIsOpen] = React.useState(false)
  // const onClose = () => setIsOpen(false)
  // const cancelRef = React.useRef()

  return (
    <>
      <Head>
        <title>
          Projects | GirlScript Summer of Code 2024 | GirlScript Foundation
          India
        </title>
        <meta
          name="description"
          content="Projects of GirlScript Summer of Code"
        />
        {/* <link
          rel="icon"
          href="https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png"
        /> */}
      </Head>
      <section>
      <div className="flex flex-col items-center w-full gap-2">
          <div className="text-primary_orange-0 mt-4 dark:text-white font-sans text-3xl md:text-5xl text-center font-extrabold">
            <h1 className="text-primary_orange-0">Projects - GSSoC&apos;{year}</h1>
          </div>
            <Spacer mt={16} />
                  <div className="flex flex-row justify-center flex-wrap items-center gap-5">
                    {Object.keys(projectLinks)
                      .reverse()
                      .map((year) => {
                        return (
                          <button
                            key={year}
                            className="bg-gradient-to-b from-primary_orange-0 to-orange-600 text-lg dark:text-black rounded-b-md hover:bg-gradient-to-t hover:from-primary_orange-0 hover:to-orange-600 text-md text-white font-bold px-10 py-3 rounded md:text-2xl md:py-4"
                            onClick={() => getProjects(year)}
                          >
                            {year}
                          </button>
                        );
                      })}
                  </div>
            <div className="flex w-full justify-end items-center mt-4">
              <div className="flex border-b-2 items-center ml-auto mr-4">
                <Search2Icon color={theme === "light" ? "black" : "white"} />
                <input
                  className="px-3 py-1 bg-transparent outline-none dark:text-white text-black"
                  type="search"
                  placeholder="Search projects..."
                  name="search"
                  id="search"
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>
          </div>       
        {year==="2024-Extd" && (      // remove this when full code when leaderboard display time
            <div className="flex justify-center items-center mt-16 px-4">
              <div className="text-xl text-center text-black dark:text-white w-full max-w-3xl">
                <h1 className="text-5xl font-extrabold text-[#f57d33] mb-8 animate-pulse">
                  COMING SOON!
                </h1>
                <p className="leading-relaxed">
                  New projects for{" "}
                  <span className="font-bold text-[#f57d33]">GSSoC&apos;24 Extended</span>{" "}
                  will be listed soon. In the meantime, feel free to explore previous
                  program projects for inspiration! <br /><br />
                  <span className="font-bold">Note:</span> The coding period will run from{" "}
                  <span className="font-bold text-[#f57d33]">October 1st to October 30th</span>, 
                  and only contributions made during this timeline and in new projects will 
                  be considered.
                </p>
              </div>
          </div>
        )}
        {data.length > 1 && year!=="2024-Extd" && (
          <div>
            <Spacer mt={10} mb={10} />
            <SearchTags setSearchTerm={setSearchTerm} />
            <Spacer mt={10} mb={10} />
            <div
              className="flex flex-row justify-center flex-wrap items-center 
        gap-x-10 gap-y-10 mt-9"
            >
              {data
                .sort(() => 0.5 - Math.random())
                .filter((curElem, i) => {
                  if (searchTerm == "") return curElem;
                  if (
                    curElem.technology_used
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    curElem.project_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                    return curElem;
                })
                .map((curElem, i) => {
                  return (
                    <div
                      className="flex items-center justify-between w-80"
                      key={i}
                      data-aos="flip-up"
                      data-aos-duration="800"
                    >
                      <div className="shadow dark:bg-black rounded-lg">
                        <div
                          className="overflow-y-clip rounded-lg h-fit md:h-80 
                    w-80 flex flex-col justify-start 
                    shadow-lg shadow-black-200 relative"
                        >
                          <>
                            <div className="flex flex-col justify-start gap-2 px-5 py-3">
                              <div className="font-bold text-primary_orange-0 md:text-xl">
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={
                                    curElem.project_link ||
                                    curElem.github ||
                                    "https://github.com/" +
                                      curElem.repo_fullname
                                  }
                                >
                                  {i + 1}. {curElem.project_name}
                                </a>
                              </div>
                              <div className="mb-3 text-sm dark:text-white md:text-md md:mb-4">
                                By {curElem.owner_name}
                              </div>
                            </div>
                            <SimpleGrid
                              columns={{ sm: 2, md: 3 }}
                              spacing={2}
                              margin={1}
                              className="px-2"
                            >
                              {curElem.technology_used
                                .split(",")
                                .sort((a, b) => a.length - b.length)
                                .map((techStk, k) => {
                                  return (
                                    techStk && (
                                      <button
                                        className="bg-orange-50 dark:hover:bg-slate-700 dark:bg-stone-800 rounded-2xl w-full py-1
                                      text-orange-600 drop-shadow-md font-semibold"
                                        key={k}
                                        onClick={() => {
                                          setSearchTerm(techStk.trim());
                                        }}
                                      >
                                        {techStk.trim()}
                                      </button>
                                    )
                                  );
                                })}
                            </SimpleGrid>
                          </>
                          <br />
                          <br />
                          <ProjectModal currProject={curElem} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <br />
        <br />
      </section>
    </>
  );
};

export default Project;
