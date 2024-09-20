import { useRouter } from "next/router";
import Head from "next/head";
import memberData from "../public/team_member_data/member_data.json";
import { useEffect, useState } from "react";


const TeamMember = () => {
    const router = useRouter();
    const { name } = router.query;
    const member = name ? memberData.find((m) => m[name]) : null;
    const details = member ? member[name] : {};
    const githubUsername = details.GitHub
        ? details.GitHub.split("/").pop()
        : "No GitHub Username";
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const buttonId = 'topmate-mentorship-button';

        if (details.TopmateService) {
            if (!document.getElementById(buttonId)) {
                const button = document.createElement("button");
                button.id = buttonId;
                button.textContent = "1:1 Mentorship";
                button.style.position = "fixed";
                button.style.right = "30px";
                button.style.bottom = "30px";
                button.style.backgroundColor = "#000";
                button.style.color = "#fff";
                button.style.padding = "10px 20px";
                button.style.borderRadius = "5px";
                button.style.zIndex = "1000";
                button.onclick = () => setIsModalOpen(true); 

                document.body.appendChild(button);
            }
        }

        return () => {
            const existingButton = document.getElementById(buttonId);
            if (existingButton) {
                document.body.removeChild(existingButton);
            }
        };
    }, [details.TopmateService]);

    useEffect(() => {
        if (isModalOpen) {
            const modalDiv = document.createElement("div");
            modalDiv.id = 'topmate-modal';
            modalDiv.style.position = "fixed";
            modalDiv.style.top = "50%";
            modalDiv.style.left = "50%";
            modalDiv.style.transform = "translate(-50%, -50%)";
            modalDiv.style.width = "80%";
            modalDiv.style.maxWidth = "600px";
            modalDiv.style.height = "80%";
            modalDiv.style.maxHeight = "800px";
            modalDiv.style.backgroundColor = "white";
            modalDiv.style.border = "1px solid #ccc";
            modalDiv.style.borderRadius = "10px";
            modalDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            modalDiv.style.zIndex = "1000";
            modalDiv.style.overflow = "auto";
            modalDiv.style.padding = "20px";
            document.body.appendChild(modalDiv);

            const closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.style.position = "absolute";
            closeButton.style.top = "10px";
            closeButton.style.right = "10px";
            closeButton.style.backgroundColor = "#000";
            closeButton.style.color = "#fff";
            closeButton.style.border = "none";
            closeButton.style.borderRadius = "5px";
            closeButton.style.padding = "5px 10px";
            closeButton.style.cursor = "pointer";
            closeButton.onclick = () => {
                setIsModalOpen(false);
                document.body.removeChild(modalDiv);
            };
            modalDiv.appendChild(closeButton);

            const iframe = document.createElement("iframe");
            iframe.src = `${details.TopmateService}?embed=true`;
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            modalDiv.appendChild(iframe);
        }
    }, [isModalOpen, details.TopmateService]);

    if (!member) {
        return (
            <div className="flex flex-col items-center justify-center min-h-72 p-4 dark:text-white">
                <p className="text-black text-center text-4xl font-semibold mb-4 dark:text-white">
                    Team Member Not Found
                </p>
                <button
                    onClick={() => router.push("/team")}
                    className="bg-primary_orange-0 text-black dark:text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-primary_orange-600 transition-colors duration-300"
                >
                    Back to Team&apos;s Page
                </button>
            </div>
        );
    }

    const languageStyles = {
        NextJS: {
            logo: "next.js",
            bgColor: "black",
            logoColor: "white",
        },
        Solidity: {
            logo: "solidity",
            bgColor: "%23363636",
            logoColor: "white",
        },
        ReactNative: {
            logo: "react",
            bgColor: "%23363636",
            logoColor: "%2361DAFB",
        },
        ReactJS: {
            logo: "react",
            bgColor: "%23363636",
            logoColor: "%2361DAFB",
        },
        HTML5: {
            logo: "html5",
            bgColor: "%23E34F26",
            logoColor: "white",
        },
        CSS3: {
            logo: "css3",
            bgColor: "%231572B6",
            logoColor: "white",
        },
        TailwindCSS: {
            logo: "tailwind-css",
            bgColor: "%2338B2AC",
            logoColor: "white",
        },
        Bootstrap: {
            logo: "bootstrap",
            bgColor: "%238511FA",
            logoColor: "white",
        },
        JavaScript: {
            logo: "javascript",
            bgColor: "%23323330",
            logoColor: "%23F7DF1E",
        },
        TypeScript: {
            logo: "typescript",
            bgColor: "%23007ACC",
            logoColor: "white",
        },
        Python: {
            logo: "python",
            bgColor: "3670A0",
            logoColor: "ffdd54",
        },
        "C++": {
            logo: "c%2B%2B",
            bgColor: "%2300599C",
            logoColor: "white",
        },
        C: {
            logo: "c",
            bgColor: "%2300599C",
            logoColor: "white",
        },
        Java: {
            logo: "openjdk",
            bgColor: "%23ED8B00",
            logoColor: "%23F7DF1E",
        },
        NodeJS: {
            logo: "node.js",
            bgColor: "6DA55F",
            logoColor: "white",
        },
        ExpressJS: {
            logo: "express",
            bgColor: "%23404d59",
            logoColor: "%2361DAFB",
        },
        MongoDB: {
            logo: "mongodb",
            bgColor: "%234ea94b",
            logoColor: "white",
        },
        Django: {
            logo: "django",
            bgColor: "%23092E20",
            logoColor: "white",
        },
        Firebase: {
            logo: "firebase",
            bgColor: "%23039BE5",
            logoColor: "white",
        },
        Git: {
            logo: "git",
            bgColor: "%23F05033",
            logoColor: "white",
        },
        GitHub: {
            logo: "github",
            bgColor: "%23121011",
            logoColor: "white",
        },
        Figma: {
            logo: "figma",
            bgColor: "%23F24E1E",
            logoColor: "white",
        },
        PowerBI: {
            logo: "power_bi",
            bgColor: "F2C811",
            logoColor: "black",
        },
        NestJS: {
            logo: "nestjs",
            bgColor: "%23E0234E",
            logoColor: "white",
        },
        GoLang: {
            logo: "go",
            bgColor: "%2300ADD8",
            logoColor: "white",
        },
        CSharp: {
            logo: "csharp",
            bgColor: "%23239120",
            logoColor: "white",
        },
        Rust: {
            logo: "rust",
            bgColor: "%23000000",
            logoColor: "white",
        },
        VSCode: {
            logo: "VS Code",
            bgColor: "0078d7",
            logoColor: "white",
        },
        Eclipse: {
            logo: "eclipse",
            bgColor: "FE7A16",
            logoColor: "white",
        },
        Postman: {
            logo: "postman",
            bgColor: "FF6C37",
            logoColor: "white",
        },
        Canva: {
            logo: "canva",
            bgColor: "%2300C4CC",
            logoColor: "white",
        },
        R: {
            logo: "r",
            bgColor: "%23276DC3",
            logoColor: "white",
        },
        Markdown: {
            logo: "markdown",
            bgColor: "%23000000",
            logoColor: "white",
        },
        MermaidJS: {
            logo: "mermaid",
            bgColor: "ff3670",
            logoColor: "white",
        },
        Oracle: {
            logo: "oracle",
            bgColor: "F80000",
            logoColor: "white",
        },
    };

    return (
        <>
            <Head>
                <title>
                    {details.Name} | GirlScript Summer of Code 2024 | GirlScript
                    Foundation India
                </title>
                <meta
                    name="description"
                    content="GirlScript Summer of Code Team"
                />
            </Head>
            <div className="container mx-auto p-6">
                {/* 2 cols flex containr */}
                <div className="flex flex-col lg:flex-row justify-center items-start lg:space-x-10">
                    {/* Left Col */}
                    <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
                        <div className="mb-6">
                            <img
                                src={details.Image}
                                alt={details.Name}
                                draggable="false"
                                className="rounded-lg shadow-lg w-64 h-64 object-cover mx-auto lg:mx-0 border-8 border-orange-500"
                            />
                        </div>

                        <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center lg:text-left dark:text-white">
                            {details.Name}
                        </h1>

                        <p className="text-gray-600 mb-4 text-center lg:text-left dark:text-[#999]">
                            {githubUsername}
                        </p>

                        <div className="flex justify-center lg:justify-start mb-6">
                            <p className="text-xl text-white bg-primary_orange-0 rounded-lg px-4 py-2 text-center">
                                {details.Designation}
                            </p>
                        </div>

                        {details.University && (
                            <p className="text-gray-800 mb-4 text-center lg:text-left dark:text-white">
                                <strong>University:</strong>{" "}
                                {details.University || "N/A"}
                            </p>
                        )}

                        <p className="text-gray-800 mb-6 text-center lg:text-left dark:text-white">
                            <strong>Location:</strong>{" "}
                            {details.Location || "India"}
                        </p>

                        {details.Languages && details.Languages.length > 0 && (
                            <div className="text-gray-800 mb-6 text-center lg:text-left dark:text-white">
                                <h2 className="text-lg font-semibold mb-2">
                                    Languages/Tools
                                </h2>
                                <ul className="flex flex-wrap justify-center lg:justify-start list-none p-0 m-0">
                                    {details.Languages &&
                                        details.Languages.map(
                                            (language, index) => (
                                                <li key={index} className="m-2">
                                                    <img
                                                        src={`https://img.shields.io/badge/${language}-${
                                                            languageStyles[
                                                                language.replace(
                                                                    /\s+/g,
                                                                    ""
                                                                )
                                                            ]?.bgColor || "grey"
                                                        }?style=for-the-badge&logo=${
                                                            languageStyles[
                                                                language.replace(
                                                                    /\s+/g,
                                                                    ""
                                                                )
                                                            ]?.logo
                                                        }&logoColor=${
                                                            languageStyles[
                                                                language.replace(
                                                                    /\s+/g,
                                                                    ""
                                                                )
                                                            ]?.logoColor
                                                        }`}
                                                        alt={language}
                                                    ></img>
                                                </li>
                                            )
                                        )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right Col */}
                    <div className="w-full lg:w-2/3">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2 rounded-md inline-block dark:text-white">
                                About {details.Name}
                            </h2>
                            <p className="text-gray-800 dark:text-white">
                                {details.Bio || "N/A"}
                            </p>
                        </div>

                        {/* {details.Sponsor && (
                            <div className="mb-6">
                                <a
                                    href={details.Sponsor}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 text-white bg-orange-400 rounded-lg hover:bg-orange-500 transition-colors duration-300 focus:outline-none focus:ring focus:ring-orange-600 dark:focus:ring-orange-800 shadow-lg"
                                >
                                    &#9829; Sponsor
                                </a>
                            </div>
                        )} */}

                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2 rounded-md inline-block dark:text-white">
                                Social Links
                            </h2>
                            <div className="flex">
                                <div className="flex gap-4">
                                    {details.GitHub &&
                                        details.GitHub.trim() !== "" && (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={details.GitHub}
                                            >
                                                <svg
                                                    className="w-12 h-12 text-black fill-current"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                                </svg>
                                            </a>
                                        )}
                                    {details.Twitter &&
                                        details.Twitter.trim() !== "" && (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={details.Twitter}
                                            >
                                                <img
                                                    className="w-12 h-12 text-black fill-current"
                                                    src="/twitter.svg"
                                                    alt="Twitter"
                                                />
                                            </a>
                                        )}
                                    {details.LinkedIn &&
                                        details.LinkedIn.trim() !== "" && (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={details.LinkedIn}
                                            >
                                                <img
                                                    className="w-12 h-12 text-black fill-current"
                                                    src="/linkedin.svg"
                                                    alt="Linkedin"
                                                />
                                                {/* <svg
                                                    className="w-12 h-12 text-black fill-current"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                >
                                                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                                                </svg> */}
                                            </a>
                                        )}
                                    {details.Instagram &&
                                        details.Instagram.trim() !== "" && (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={details.Instagram}
                                            >
                                                <img
                                                    className="w-12 h-12"
                                                    src="/instagram.svg"
                                                    alt="Instagram"
                                                />
                                            </a>
                                        )}
                                    {details.Facebook &&
                                        details.Facebook.trim() !== "" && (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={details.Facebook}
                                            >
                                                <img
                                                    className="w-12 h-12 text-black fill-current"
                                                    src="/facebook.svg"
                                                    alt="Facebook"
                                                />
                                            </a>
                                        )}
                                    {details.Pinterest &&
                                        details.Pinterest.trim() !== "" && (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={details.Pinterest}
                                            >
                                                <img
                                                    className="w-12 h-12 text-black fill-current"
                                                    src="/pinterest.svg"
                                                    alt="Pinterest"
                                                />
                                            </a>
                                        )}
                                    {details.Portfolio &&
                                        details.Portfolio.trim() !== "" && (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={details.Portfolio}
                                            >
                                                <div className="w-12 h-12 flex items-center justify-center bg-black rounded-md">
                                                    <span className="text-[#303030] font-bold text-3xl">
                                                        P
                                                    </span>
                                                </div>
                                                {/* <img
                                                    className="w-12 h-12 text-black fill-current"
                                                    src="/instagram.svg"
                                                    alt="Twitter"
                                                /> */}
                                            </a>
                                        )}
                                    {details.Topmate &&
                                        details.Topmate.trim() !== "" && (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={details.Topmate}
                                            >
                                                <div className="w-12 h-12 flex items-center justify-center bg-black rounded-md">
                                                    <span className="text-white dark:text-[#303030] font-bold text-3xl">
                                                        T
                                                    </span>
                                                </div>
                                            </a>
                                        )}
                                    {details.GoogleDeveloper &&
                                        details.GoogleDeveloper.trim() !==
                                            "" && (
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={details.GoogleDeveloper}
                                            >
                                                <div className="w-12 h-12 flex items-center justify-center bg-black rounded-md">
                                                    <span className="text-[#303030] font-bold text-3xl">
                                                        G
                                                    </span>
                                                </div>
                                                {/* <img
                                                    className="w-12 h-12 text-black fill-current"
                                                    src="/instagram.svg"
                                                    alt="Twitter"
                                                /> */}
                                            </a>
                                        )}
                                </div>
                            </div>
                        </div>

                        {details.Skills && details.Skills.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-white">
                                    Skills
                                </h2>
                                <ul className="flex flex-wrap justify-center lg:justify-start list-none p-0 m-0 dark:text-white">
                                    {details.Skills.map((skill, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-800 m-2 dark:text-white bg-orange-400 rounded-md p-2"
                                        >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {details.RecentActivity &&
                            details.RecentActivity.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 mt-4 dark:text-white">
                                        Recent Activity
                                    </h2>
                                    <p
                                        className="text-gray-800 text-xl dark:text-white"
                                        title="visit leaderboard"
                                    >
                                        <a
                                            href="https://gssoc.girlscript.tech/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {details.RecentActivity || "N/A"}
                                        </a>
                                    </p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamMember;
