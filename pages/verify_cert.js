import { Spacer } from "@chakra-ui/react";
import Head from "next/head";
import { useState, useEffect } from "react";
// import FileSaver from "file-saver";
// import CertImg from "../components/cert.svg";
import dynamic from "next/dynamic";
// const exportComponentAsPNG = dynamic(import('react-component-export-image'), { ssr: false });

const Certi_Comp = dynamic(() => import("../components/Certi_Comp"), {
  ssr: false,
});

const Cert = () => {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Role, setRole] = useState("Contributor");
  const [verified, setVerified] = useState(false);
  const [year, setYear] = useState("2024");
  const [githubId, setGithubId] = useState("");
  const [rank, setRank] = useState("");

  const setVerifiedTrue = () => {
    setVerified(true);
  }
  // () => {
  //   var image_url = "https://res.cloudinary.com/dqjtoo2h2/image/upload/co_rgb:FD7617,l_text:Playfair%20Display_80_bold_normal_left:"+Name+"/fl_layer_apply,g_center,x_0.2,y_-0.12/GSSoC2022_Cert_nf09fu.png"
  //   FileSaver.saveAs(image_url, "Cert_GSSoC.png");
  // }

  /* Note to future devs 
  Directly downloading doesn't seem to work because the CSS breaks when downloading th Blog.
  Hence the source of download is entirely different
  */
  // useCallback(() => {
  //   if (ref.current === null) {
  //     return
  //   }

  //   toPng(ref.current, { cacheBust: true, })
  //     .then((dataUrl) => {
  //       const link = document.createElement('a')
  //       link.download = Name+"Cert GSSOC2022.png"
  //       link.href = dataUrl
  //       link.click()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [ref]);

  useEffect(() => {
    const verifyGithubId = async () => {
      if (!githubId) return; 

      try {
        const response = await fetch("/leaderboards/leaderboard24.json");
        const leaderboard = await response.json();

        const userIndex = leaderboard.leaderboard.findIndex(
          (user) => user.login.toLowerCase() === githubId.toLowerCase()
        );

        if (userIndex === -1) {
          setRank(""); 
          setVerified(false);
          return;
        }

        const rank = userIndex + 1;
        setRank(rank); 
        setVerified(true);
      } catch (error) {
        console.error("Error verifying GitHub ID:", error);
        setRank(""); 
        setVerified(false); 
      }
    };

    verifyGithubId();
  }, [githubId]);

  return (
    <>
      <Head>
        <title>
          Verify Certifications | GirlScript Summer of Code 2024 | GirlScript
          Foundation India
        </title>
        <meta
          name="description"
          content="GirlScript Summer of Code Certificates"
        />
      </Head>
      <div className="items-center justify-center">
        <div className="font-sans text-center text-2xl font-extrabold text-black-100">
          <div className="text-primary_orange-0 dark:text-white font-sans text-3xl md:text-5xl text center font-extrabold flex wrap justify-center flex-col md:flex-row mb-10 underline decoration-orange-500  underline-offset-8">
            <h1 className="text-primary_orange-0">Verify&nbsp;</h1>
            <h1>Certifications</h1>
          </div>
        </div>
      </div>
      <Spacer mt={20} />
      <div className="flex flex-col bg-white shadow-2xl dark:bg-black mb-10 rounded-md mx-2 sm:mx-10 md:mx-10 lg:mx-20 px-10 py-2">
        <label className="text-black dark:text-primary_orange-0 font-semibold mt-3 text-lg">
          Enter Registered Email*
        </label>
        <input
          type="text"
          className="text-primary_orange-0 dark:text-white dark:border-slate-200 border-black border-2 rounded-md font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          onChange={(e) => setEmail(e.target.value)}
          disabled={verified}
        ></input>
        <label className="text-black dark:text-primary_orange-0 font-semibold mt-3 text-lg">
          Enter Name*
        </label>
        <input
          type="text"
          className="text-primary_orange-0 dark:text-white dark:border-slate-200 border-black border-2 rounded-md font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          disabled={verified}
        ></input>
        <label className="text-black dark:text-primary_orange-0 font-semibold mt-3 text-lg">
          Select Year of Participation in GSSoC
        </label>
        <select
          className="text-primary_orange-0 dark:text-white font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          defaultValue="2024"
          onChange={(e) => setYear(e.target.value)}
          disabled={verified}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <label className="text-black dark:text-primary_orange-0 font-semibold mt-3 text-lg">
          {`Select Role in GSSoC ${year}`}
        </label>
        <select
          className="text-primary_orange-0 dark:text-white font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          defaultValue="Contributor"
          onChange={(e) => setRole(e.target.value)}
          disabled={verified}
        >
          <option value="Contributor">Contributor</option>
          <option value="Top Contributor">Top 100 Contributor</option>
          <option value="Mentor">Mentor</option>
          <option value="Project Admin">Project Admin</option>
          <option value="Campus Ambassador">Campus Ambassador</option>
          <option value="Speaker">Speaker</option>
          <option value="Organizing Team">Organizing Team</option>
        </select>
        <Spacer mt={3} />
        {/* <img
          src="https://res.cloudinary.com/dqjtoo2h2/image/upload/l_text:helvetica_72_bold_normal_left:Contributor/fl_layer_apply,g_center,x_0.2,y_-0.1/CA_Speaker_certificate_oqydmx.jpg"
          className="w-full h-auto mt-4"
          id="canvas"
        /> */}
        <label className="text-black dark:text-primary_orange-0 font-semibold mt-3 text-lg">
          Enter GitHub ID*
        </label>
        <input
          type="text"
          className="text-primary_orange-0 dark:text-white dark:border-slate-200 border-black border-2 rounded-md font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          value={githubId}
          onChange={(e) => setGithubId(e.target.value)}
          disabled={verified}
        ></input>
        <label className="text-black dark:text-primary_orange-0 font-semibold mt-3 text-lg">
          Rank
        </label>
        <input
          type="text"
          className="text-primary_orange-0 dark:text-white dark:border-slate-200 border-black border-2 rounded-md font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          value={rank}
          disabled
        ></input>
        <Certi_Comp Name={Name} Role={Role} Email={Email} Rank={rank} verified={verified} setVerified={setVerifiedTrue} year={year} />
      </div>
    </>
  );
};

export default Cert;
