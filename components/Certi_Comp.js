import React, { useEffect, useState } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { Spacer } from "@chakra-ui/react";
import { ethers } from "ethers";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import ABI from "../pages/JSON/ABI.json";
import Confetti from "react-confetti";
import axios from "axios";
import html2canvas from "html2canvas";
const contractAddress = "0x0E2195E4292458eaA9Ee30242Fce440b5a722944";

const Certi_Comp = (props) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const certificateWrapper = React.createRef();
  const [CampusAmbassadors, setCampusAmbassadors] = useState([]);
  const [Contributors, setContributors] = useState([]);
  const [Mentors, setMentors] = useState([]);
  const [OpenSourceAdvocates, setOpenSourceAdvocates] = useState([]);
  const [OrganizingTeam, setOrganizingTeam] = useState([]);
  const [ProjectAdmins, setProjectAdmins] = useState([]);
  const [Top100, setTop100] = useState([]);
  const [certificateId,setCertificateId] = useState("")
  useEffect(() => {
    const getCertificateData = async () => {
      try {
        const resCA = await fetch(
          `/certificatesData/${props.year}/CampusAmbassadors.json`
        );
        const dataCA = await resCA.json();
        const resC = await fetch(
          `/certificatesData/${props.year}/Contributors.json`
        );
        const dataC = await resC.json();
        const resM = await fetch(
          `/certificatesData/${props.year}/Mentors.json`
        );
        const dataM = await resM.json();
        const resOSA = await fetch(
          `/certificatesData/${props.year}/OpenSourceAdvocates.json`
        );
        const dataOSA = await resOSA.json();
        const resOT = await fetch(
          `/certificatesData/${props.year}/OrganizingTeam.json`
        );
        const dataOT = await resOT.json();
        const resPA = await fetch(
          `/certificatesData/${props.year}/ProjectAdmins.json`
        );
        const dataPA = await resPA.json();
        const resT100 = await fetch(
          `/certificatesData/${props.year}/Top100.json`
        );
        const dataT100 = await resT100.json();
        setCampusAmbassadors(dataCA);
        setContributors(dataC);
        setMentors(dataM);
        setOpenSourceAdvocates(dataOSA);
        setOrganizingTeam(dataOT);
        setProjectAdmins(dataPA);
        setTop100(dataT100);
      } catch (error) {
        console.log(error);
      }
    };
    getCertificateData();
  }, [props.year]);

  const DownloadImage = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined" && props.verified === true) {
      html2canvas(certificateWrapper.current).then((canva)=>{
        const base64 = canva.toDataURL("image/png")
        var anchor = document.createElement("a")
        anchor.setAttribute("href",base64)
        anchor.setAttribute("download",props.Name + "_Cert_" + props.Role + `_GSSoC${props.year}.png`)
        anchor.click()
        anchor.remove()
      }).catch((err)=>console.log(err))
    }
  };

  // // const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_PROVIDER");
  // const provider = new ethers.providers.JsonRpcProvider(
  //   process.env.JSON_RPC_PROVIDER
  // );
  // const privateKey =
  //   "0x2183467634e8e797c30f4a502ec8eab1a6e648ab8256668300092c4768bffc1d";
  // // add funds for ME please.xD

  // const wallet = new ethers.Wallet(privateKey, provider);
  // // console.log(wallet.address);
  // const contract = new ethers.Contract(contractAddress, ABI, provider);
  // // console.log(contract);
  // const contractWithWallet = contract.connect(wallet);

  function treeMaker(file) {
    let data = file;
    let participantDataArray = [];
    for (let key in data) {
      participantDataArray.push(
        keccak256(JSON.stringify(data[key])).toString("hex")
      );
    }
    const leaves = participantDataArray.map((participant) =>
      keccak256(participant)
    );
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree;
  }


  const setVerifiedTrue = () => {
    props.setVerified();
  };

  const checkIfVerified = (email) => {
    const lowerCaseEmail = email.toLowerCase(); // Convert email to lowercase

    // check if lowerCaseEmail is in the verified json
    // if yes, setVerifiedTrue()

    if (props.Role === "Contributor") {
      for (let i = 0; i < Contributors.length; i++) {
        if (Contributors[i].email.toLowerCase() === lowerCaseEmail) {
          setCertificateId(Contributors[i]?.cert_id)
          setVerifiedTrue();
          return true;
        }
      }
    }

    if (props.Role === "Top Contributor") {
      for (let i = 0; i < Top100.length; i++) {
        if (Top100[i].email.toLowerCase() === lowerCaseEmail) {
          setCertificateId(Top100[i]?.cert_id)
          setVerifiedTrue();
          return true;
        }
      }
    }

    if (props.Role === "Mentor") {
      for (let i = 0; i < Mentors.length; i++) {
        console.log(Mentors[i]?.email)
        if (Mentors[i]?.email?.toLowerCase() === lowerCaseEmail) {
          setCertificateId(Mentors[i]?.cert_id)
          setVerifiedTrue();
          return true;
        }
      }
    }

    if (props.Role === "Project Admin") {
      for (let i = 0; i < ProjectAdmins.length; i++) {
        if (ProjectAdmins[i].email.toLowerCase() === lowerCaseEmail) {
          setCertificateId(ProjectAdmins[i]?.cert_id)
          setVerifiedTrue();
          return true;
        }
      }
    }

    if (props.Role === "Campus Ambassador") {
      for (let i = 0; i < CampusAmbassadors.length; i++) {
        if (CampusAmbassadors[i].email.toLowerCase() === lowerCaseEmail) {
          setCertificateId(CampusAmbassadors[i]?.cert_id)
          setVerifiedTrue();
          return true;
        }
      }
    }

    if (props.Role === "Speaker") {
      for (let i = 0; i < OpenSourceAdvocates.length; i++) {
        if (OpenSourceAdvocates[i].email.toLowerCase() === lowerCaseEmail) {
          setCertificateId(OpenSourceAdvocates[i]?.cert_id)
          setVerifiedTrue();
          return true;
        }
      }
    }

    if (props.Role === "Organizing Team") {
      for (let i = 0; i < OrganizingTeam.length; i++) {
        if (OrganizingTeam[i].email.toLowerCase() === lowerCaseEmail) {
          setCertificateId(OrganizingTeam[i]?.cert_id)
          setVerifiedTrue();
          return true;
        }
      }
    }

    return false;
  };

  async function Checker(email) {
    
    const toTheMoon = checkIfVerified(email);

    if (toTheMoon) {
      setVerifiedTrue();
      console.log("GG OP EZ");
      const ver_success =
        "Verification successful.\n Achievement Unlocked 🎊!!! \n Proceed to download your hard-earned certificate from below. \n\nHope you had a great time learning & contributing with us. All the best for your future endeavors.";
      alert(ver_success);

      setShowConfetti(true);
      setTimeout(function () {
        setShowConfetti(false);
      }, 8000);
    } else {
      console.log("Never gonna give you up...");
      const ver_failed = `Verification failed.💀\nPlease recheck if you have entered the correct email (used to register in GSSoC'${props?.year.slice(
        2
      )}) & selected the appropriate role from the dropdown. \n\nIf you still feel something is wrong, feel free to make a ticket on the official server regarding the same.`;
      alert(ver_failed);
    }
  }

  const Switcher = () => {
    Checker(props.Email);
  };

  return (
    <>
      <div className="flex justify-center relative overflow-hidden" id="cert">
        {/* <Image src="/cert.png" height="700" width="1000" alt="Certificate"/> */}
        {props.Role === "Contributor" ? (
          <div
            style={{
              backgroundImage: `url(/certificates/${props.year}/GSSoC_Contrib_Cert.png)`,
            }}
            className={`banner cert-contrib bg-no-repeat`}
            ref={certificateWrapper}
          >
            <div id="contrib_name" className={`${props.year==2024?"contrib_name_2024":"contrib_name_2023"} text-big-orange`}>
              {props.verified ? props.Name : "X".repeat(props.Name.length)}
            </div>
            <div id="rank_display" className="rank_display_2024 text-big-black">
            {props.verified ? `Rank: ${props.Rank}` : "Rank: X".repeat(props.Rank.length)}
            </div>

            <h5 className="cert_id_2024 text-sm  font-bold">
              Certificate ID: <span className="font-normal">{certificateId}</span>
            </h5>
            <h5 className="issue_2024 text-sm  font-bold">
              ISSUED: <span className="font-normal">{"August 2024"}</span>
            </h5>
          </div>
        ) : props.Role === "Top Contributor" ? (
          <div
            style={{
              backgroundImage: `url(/certificates/${props.year}/GSSoC_TopContrib_Cert.png)`,
            }}
            className={`banner cert-topcontrib bg-no-repeat`}
            ref={certificateWrapper}
          >
            <div id="contrib_name" className={`${props.year==2024?"contrib_name_2024":"contrib_name_2023"} text-big-orange`}>
              {props.verified ? props.Name : "X".repeat(props.Name.length)}
            </div>
            <div id="rank_display" className="toprank_display_2024 text-big-black">
            {props.verified ? `Rank: ${props.Rank}` : "Rank: X".repeat(props.Rank.length)}
            </div>

            <h5 className="cert_id_2024 text-sm  font-bold">
              Certificate ID: <span className="font-normal">{certificateId}</span>
            </h5>
            <h5 className="issue_2024 text-sm  font-bold">
              ISSUED: <span className="font-normal">{"August 2024"}</span>
            </h5>
          </div>
        ) : props.Role === "Mentor" ? (
          <div
            style={{
              backgroundImage: `url(/certificates/${props.year}/GSSoC_Mentor_Cert.png)`,
            }}
            className={`banner cert-mentor bg-no-repeat`}
            ref={certificateWrapper}
          >
            <div id="contrib_name" className={`${props.year==2024?"contrib_name_2024":"contrib_name_2023"} text-big-orange`}>
              {props.verified ? props.Name : "X".repeat(props.Name.length)}
            </div>
            <h5 className="cert_id_2024 text-sm  font-bold">
              Certificate ID: <span className="font-normal">{certificateId}</span>
            </h5>
            <h5 className="issue_2024 text-sm  font-bold">
              ISSUED: <span className="font-normal">{"August 2024"}</span>
            </h5>
          </div>
        ) : props.Role === "Project Admin" ? (
          <div
            style={{
              backgroundImage: `url(/certificates/${props.year}/GSSoC_PA_Cert.png)`,
            }}
            className={`banner cert-pa bg-no-repeat`}
            ref={certificateWrapper}
          >
            <div id="contrib_name" className={`${props.year==2024?"contrib_name_2024":"contrib_name_2023"} text-big-orange`}>
              {props.verified ? props.Name : "X".repeat(props.Name.length)}
            </div>
            <h5 className="cert_id_2024 text-sm  font-bold">
              Certificate ID: <span className="font-normal">{certificateId}</span>
            </h5>
            <h5 className="issue_2024 text-sm  font-bold">
              ISSUED: <span className="font-normal">{"August 2024"}</span>
            </h5>
          </div>
        ) : props.Role === "Campus Ambassador" ? (
          <div
            style={{
              backgroundImage: `url(/certificates/${props.year}/GSSoC_CA_Cert.png)`,
            }}
            className={`banner cert-ca bg-no-repeat`}
            ref={certificateWrapper}
          >
            <div id="contrib_name" className={`${props.year==2024?"contrib_name_2024":"contrib_name_2023"} text-big-orange`}>
              {props.verified ? props.Name : "X".repeat(props.Name.length)}
            </div>
            <h5 className="cert_id_2024 text-sm  font-bold">
              Certificate ID: <span className="font-normal">{certificateId}</span>
            </h5>
            <h5 className="issue_2024 text-sm  font-bold">
              ISSUED: <span className="font-normal">{"August 2024"}</span>
            </h5>
          </div>
        ) : props.Role === "Speaker" ? (
          <div
            style={{
              backgroundImage: `url(/certificates/${props.year}/GSSoC_OSAdvocate_Cert.png)`,
            }}
            className={`banner cert-speaker bg-no-repeat`}
            ref={certificateWrapper}
          >
            <div id="contrib_name" className={`${props.year==2024?"contrib_name_2024":"contrib_name_2023"} text-big-orange`}>
              {props.verified ? props.Name : "X".repeat(props.Name.length)}
            </div>
            <h5 className="cert_id_2024 text-sm  font-bold">
              Certificate ID: <span className="font-normal">{certificateId}</span>
            </h5>
            <h5 className="issue_2024 text-sm  font-bold">
              ISSUED: <span className="font-normal">{"August 2024"}</span>
            </h5>
          </div>
        ) : props.Role === "Organizing Team" ? (
          <div
            style={{
              backgroundImage: `url(/certificates/${props.year}/GSSoC_Organiser_Cert.png)`,
            }}
            className={`banner cert-orgteam bg-no-repeat`}
            ref={certificateWrapper}
          >
            <div id="contrib_name" className={`${props.year==2024?"contrib_name_2024":"contrib_name_2023"} text-big-orange`}>
              {props.verified ? props.Name : "X".repeat(props.Name.length)}
            </div>
            <h5 className="cert_id_2024 text-sm  font-bold">
              Certificate ID: <span className="font-normal">{certificateId}</span>
            </h5>
            <h5 className="issue_2024 text-sm  font-bold">
              ISSUED: <span className="font-normal">{"August 2024"}</span>
            </h5>
          </div>
        ) : (
          <></>
        )}
      </div>
      <h6 id="no-mobile-alert" className="text-black dark:text-white">
        * Please download the certificate on the desktop website
      </h6>
      <Spacer mt={20} />
      <button
        type="button"
        className={
          !props.verified
            ? "bg-gradient-to-b from-primary_orange-0 to-orange-600 text-md  dark:text-black font-medium rounded-b-md hover:bg-gradient-to-t hover:from-primary_orange-0 hover:to-orange-600 text-md text-white font-bold px-5 py-1 rounded md:text-xl md:py-3"
            : "dark:text-black bg-gradient-to-b from-slate-600 to-orange-400 text-md text-white w-full font-medium py-3 px-5 rounded mb-3 text-md text-white font-bold px-5 py-1 rounded md:text-xl md:py-3"
        }
        onClick={Switcher}
        disabled={!props.verified}
      >
        Verify
      </button>
      <Spacer mt={5} />
      <button
        type="button"
        className={
          props.verified
            ? "bg-gradient-to-b from-primary_orange-0 to-orange-600 text-md dark:text-black  rounded-b-md hover:bg-gradient-to-t hover:from-primary_orange-0 hover:to-orange-600 text-md text-white font-bold px-5 py-1 rounded md:text-xl md:py-3"
            : "dark:text-black bg-gradient-to-b from-slate-600 to-orange-400 text-md text-white w-full font-medium py-3 px-5 rounded mb-3 text-md text-white font-bold px-5 py-1 rounded md:text-xl md:py-3"
        }
        onClick={DownloadImage}
        disabled={!props.verified}
      >
        Download Certificate
      </button>
      {showConfetti && <Confetti className="fullscreen" />}
    </>
  );
};

export default Certi_Comp;
