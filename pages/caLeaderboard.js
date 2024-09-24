import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Skeleton,
  SkeletonCircle,
  Spacer,
  Avatar,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";
import Head from "next/head";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Confetti from "react-confetti";
import Pagination from "react-js-pagination";

const CALeaderboard = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [loadingMsg, setLoadingMsg] = useState("Sent request to the server");
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [filter, setFilter] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const { height, width } = useWindowDimensions();
  let [lastupdated, setLastupdated] = useState("");
  function useWindowDimensions() {
    const hasWindow = typeof window !== "undefined";

    var getWindowDimensions = useCallback(() => {
      const width = hasWindow ? window.innerWidth : null;
      const height = hasWindow ? window.innerHeight : null;
      return {
        width,
        height,
      };
    }, [hasWindow]);

    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      if (hasWindow) {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, [getWindowDimensions, hasWindow]);

    return windowDimensions;
  }

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    setTimeout(() => setShowConfetti(false), 5000);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      setTimeout(function () {
        setLoadingMsg("Waiting for response from server");
      }, 600);
      try {
        const response = await fetch(``);
        const data = await response.json();
        console.log(data.leaderboard);
        const processedData = data.leaderboard.map((user) => ({
          Name: user.caName || "N/A",
          Image: user.Image || "",
          ReferralCode: user.referralCode || "abc",
          ReferralCount: parseInt(user.referralCount || "0"),
          score: calculateScore(parseInt(user.referralCount || "0")),
        }));
        processedData.sort((a, b) => b.score - a.score);
        setUsers(processedData);
        setIsLoading(false);
        setLastupdated(data.updatedTimestring);
        setSearchData(processedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, [year]);

  const calculateScore = (referralCount) => {
    return referralCount * 10;
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setActivePage(1);
  };
  const handleJumpToPage = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const filterData = () => {
    const filteredData = users.filter((user) =>
      user.Name.toLowerCase().includes(filter.toLowerCase())
    );
    setSearchData(filteredData);
    setActivePage(1);
  };

  const columns = [
    { id: "position", label: "Rank", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 200 },
    { id: "referralCode", label: "Referral Code", minWidth: 100 },
    { id: "referralCount", label: "Referral Count", minWidth: 100 },
    { id: "score", label: "Score", minWidth: 100 },
  ];

  const years = ["Extended", 2024, 2023];
  const renderTopThree = () => {
    const orderedData = [
      { ...searchData[1], rank: 2 },
      { ...searchData[0], rank: 1 },
      { ...searchData[2], rank: 3 },
    ];

    return orderedData.map((user, index) => (
      <div
        key={index}
        className={`py-5 px-0 xl:pb-12 xl:px-24 xl:pt-0 text-center font-sans ${
          user.rank === 1 ? "text-2xl" : "text-base"
        }`}
      >
        <div className="flex font-sans md:flex-row justify-between gap-y-1 gap-x-1 md:gap-x-2 items-center my-10">
          <div
            className={`bg-white shadow-2xl dark:bg-black rounded-md px-0 sm:px-3 py-2 md:px-16 lg:py-4 relative inline-block ${
              user.rank === 1 ? "w-36 md:w-auto" : "w-28 md:w-auto"
            }`}
          >
            {user === undefined ? (
              <>
                <SkeletonCircle className="skeleton-circle-md" />
                <SkeletonText mt="4" noOfLines={1} spacing="4" />
              </>
            ) : (
              <>
                <Avatar src={user.Image} name={user.Name} size="xl" />
                <h3
                  className={`text-black dark:text-primary_orange-0 font-semibold mt-2 ${
                    user.rank === 1
                      ? "text-lg"
                      : "text-xs sm:text-sm md:text-md"
                  }`}
                >
                  {user.rank}. {user.Name}
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Head>
        <title>
          Top Campus Ambassadors | GirlScript Summer of Code | GirlScript
          Foundation India
        </title>
        <meta
          name="description"
          content={`GirlScript Summer of Code Campus Ambassador Leaderboard`}
        />
      </Head>
      {isLoading && (
        <div className="loader-div">
          <div className="overlay dark:bg-darkmode_gray-0 font-sans"></div>
          <div className="loader-group-container">
            <div className="loader-group dark:bg-black">
              <Spinner
                className="loader"
                thickness="6px"
                speed="0.65s"
                emptyColor="gray.200"
                color="orange.500"
                size="xl"
              />
              <span className="loading-msg dark:text-white">{loadingMsg}</span>
            </div>
          </div>
        </div>
      )}
      {showConfetti && <Confetti width={windowWidth} height={windowHeight} />}
      <div className="items-center font-sans justify-center mt-20">
        <div className="font-sans text-center text-md font-extrabold text-black-100 mt-5">
          <div className="flex justify-center mb-5">
            <button
              className={`bg-gradient-to-b from-primary_orange-0 to-orange-600 text-lg dark:text-black rounded-b-md hover:bg-gradient-to-t hover:from-primary_orange-0 hover:to-orange-600 text-md text-white font-bold px-10 py-3 rounded md:text-2xl md:py-4 mx-2`}
            >
              2024 EXTD
            </button>
          </div>
          <div className="text-primary_orange-0 dark:text-white font-sans text-3xl md:text-5xl text center font-extrabold flex wrap justify-center flex-col md:flex-row mb-10 underline decoration-orange-500  underline-offset-8">
            <h1 className="text-primary_orange-0 mt-5 font-sans">
              Top Campus Ambassadors&nbsp;
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center">{renderTopThree()}</div>
      <Spacer mt={10} />
      <div className="flex mb-5 font-sans">
        <div className="input-group relative flex flex-wrap items-stretch w-[80%] m-auto">
          <span className="relative flex items-center w-1/2 justify-start">
            <label className="mr-2 whites-nowrap text-gray-900 dark:text-gray-200 font-large text-xxl hover:text-gray-400">
              Showing
            </label>
            <select
              className="relative bg-gray-300 dark:bg-neutral-600 text-gray-900 dark:text-gray-200 font-large text-xxl hover:text-gray-400 items-center"
              onInput={handleItemsPerPageChange}
              onChange={() => handlePageChange(1)}
              value={itemsPerPage}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <label className="ml-2 whites-nowrap text-gray-900 dark:text-gray-200 font-large text-xxl hover:text-gray-400">
              rows per page
            </label>
          </span>
          <span className="relative flex w-1/2 justify-end font-sans">
            <span className="relative search-container flex w-full justify-end">
              <div className="relative flex search-container">
                <input
                  onChange={(e) => {
                    setFilter(e.target.value);
                    filterData();
                  }}
                  value={filter}
                  id="searchInputField"
                  type="text"
                  className="form-control relative flex-auto min-w-0 block px-0.5 py-1.5 text-base dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-600 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-400 focus:outline-none dark:placeholder-neutral-300"
                  placeholder="Search"
                  onKeyUp={() => {
                    filterData();
                  }}
                />
                <span className="search-count dark:text-neutral-300">
                  {searchData.length}
                </span>
              </div>
            </span>
          </span>
        </div>
      </div>
      <div className="bg-sky-100 font-sans dark:bg-orange-200 px-1.5 py-1.5 rounded-md w-[80%] text-center m-auto mb-3">
        <p className="text-sky-700 dark:text-orange-900 text-sm">
          {isLoading === false && lastupdated !== "" && (
            <>
              The leaderboard was last updated on: <b>{lastupdated}</b>
            </>
          )}
          {isLoading === false && lastupdated === null && (
            <>The server is updating. Please comeback after 5-10 mins</>
          )}
          <a
            className="ml-2 underline hover:no-underline"
            href="https://github.com/GSSoC24/Contributor/discussions/288"
            target="_blank"
            rel="noreferrer"
          >
            More details about badges
          </a>
        </p>
      </div>

      <div className="w-[80%] font-sans m-auto overflow-x-auto">
        <div className="table w-full">
          <div className="table-header-group">
            <div className="table-row">
              {columns.map((column) => (
                <div
                  className="table-cell font-serif px-4 py-4 bg-black text-white dark:bg-primary_orange-0 dark:text-black"
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </div>
              ))}
            </div>
          </div>
          {!isLoading && (
            <div className="table-row-group">
              {searchData
                .slice(
                  (activePage - 1) * itemsPerPage,
                  activePage * itemsPerPage
                )
                .map((user, index) => (
                  <div
                    className={`table-row ${
                      index % 2 === 0
                        ? "bg-leaderboardbg-0 dark:bg-gray-800"
                        : "bg-[#FFF7ED] dark:bg-gray-900"
                    }`}
                    key={index}
                  >
                    <div className="table-cell px-4 py-6 text-black dark:bg-black dark:text-white font-medium">
                      {(activePage - 1) * itemsPerPage + index + 1}
                    </div>
                    <div className="table-cell px-4 py-6 text-black dark:bg-black dark:text-white font-medium">
                      <div className="flex items-center">
                        <Avatar src={user.Image} name={user.Name} size="sm" />
                        <span className="ml-2">{user.Name}</span>
                      </div>
                    </div>
                    <div className="table-cell px-4 py-6 text-black dark:bg-black dark:text-white font-medium">
                      {user.ReferralCode}
                    </div>
                    <div className="table-cell px-4 py-6 text-black dark:bg-black dark:text-white font-medium">
                      {user.ReferralCount}
                    </div>
                    <div className="table-cell px-4 py-6 text-black dark:bg-black dark:text-white font-medium">
                      {user.score}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        {isLoading && (
          <div className="flex flex-col items-center justify-center w-full h-80 gap-5">
            <SkeletonCircle size="80" />
            <Skeleton>
              <Box className="text-center px={4}"> Loading data... </Box>
            </Skeleton>
          </div>
        )}
      </div>
      {!isLoading && isClient && searchData.length > 0 && (
        <div className="font-sans pagination-holder mb-20">
          <div className="flex sm:space-y-4 justify-between items-center w-[80%] m-auto py-4">
            {/* Left side for current range */}
            <div className="text-gray-700 dark:text-gray-300 md:text-base md:text-left sm:text-sm">
              {`${(activePage - 1) * itemsPerPage + 1}-${Math.min(
                activePage * itemsPerPage,
                searchData.length
              )}/${searchData.length}`}
            </div>

            {/* Center for Page Numbers */}
            <div className="flex font-sans justify-center w-full md:w-auto">
              <Pagination
                innerClass={
                  theme === "dark" ? "dark-theme pagination" : "pagination"
                }
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                activeClass="active-page"
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={searchData.length}
                pageRangeDisplayed={width < 600 ? 3 : 5}
                onChange={handlePageChange}
              />
            </div>

            {/* Right side for Jump to page */}
            <div className="flex font-sans items-center justify-center w-full md:w-auto">
              <input
                type="number"
                placeholder="Jump to page"
                min="1"
                max={Math.ceil(searchData.length / itemsPerPage)}
                className="w-full sm:w-24 md:w-32 px-2 py-2 border rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:outline-gray-800 dark:outline-text-white md:text-left"
                onChange={(e) =>
                  handleJumpToPage(() => Math.abs(e.target.value) || 1)
                }
              />
            </div>
          </div>
        </div>
      )}
      {!isLoading && searchData.length === 0 && (
        <div className="text-center font-sans text-xl mt-10">
          No entries found for the selected year.
        </div>
      )}
    </>
  );
};

export default CALeaderboard;
