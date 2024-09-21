import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Spacer } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import axios from "axios";

const BadgeID_Comp = (props) => {
  const badgeWrapper = React.createRef();
  const [CampusAmbassadors, setCampusAmbassadors] = useState([]);
  const [Contributors, setContributors] = useState([]);
  const [Mentors, setMentors] = useState([]);
  const [ProjectAdmins, setProjectAdmins] = useState([]);
  useEffect(() => {
    const getBadgeData = async () => {
      try {
        const resCA = await axios.get(
          `https://opensheet.elk.sh/1v7G6EICAMtZtf1B4KuzJI_VNQE2YmKjNusu_wPPOw6g/1`
        );
        const dataCA = await resCA.data;
        const resC = await axios.get(
          `https://opensheet.elk.sh/1rCkCtw-DS8q2awBcFFM1KtAYen2HZD2hHg41v7ek2lA/1`
        );
        const dataC = await resC.data;
        const resM = await axios.get(
          `https://opensheet.elk.sh/1YK8yZQ43C9r8ucXs3m3hDzt6ksDwz89WHyaIt7U7RlE/1`
        );
        const dataM = await resM.data;
        const resPA = await axios.get(
          `https://opensheet.elk.sh/1DDCsq3V_nlLfscZf8fzwsotQm65YxJMMliUz7D-VCMQ/1`
        );
        const dataPA = await resPA.data;
        setCampusAmbassadors(dataCA);
        setContributors(dataC);
        setMentors(dataM);
        setProjectAdmins(dataPA);
      } catch (error) {
        console.log(error);
      }
    };
    getBadgeData();
  }, []);

  const DownloadImage = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined" && props.verified === true) {
      html2canvas(badgeWrapper.current)
        .then((canva) => {
          const base64 = canva.toDataURL("image/png");
          var anchor = document.createElement("a");
          anchor.setAttribute("href", base64);
          anchor.setAttribute(
            "download",
            props.Name.replace(/\s+/g, "_") +
              "_Badge_" +
              props.Role.replace(/\s+/g, "_") +
              `_GSSoC2024-Extd.png`
          );
          anchor.click();
          anchor.remove();
        })
        .catch((err) => console.log(err));
    }
  };

  const setVerifiedTrue = () => {
    props.setVerified();
  };

  const checkIfVerified = (email) => {
    const lowerCaseEmail = email.toLowerCase();

    if (props.Role === "Contributor") {
      for (let i = 0; i < Contributors.length; i++) {
        if (Contributors[i].email.toLowerCase() === lowerCaseEmail) {
          setVerifiedTrue();
          return true;
        }
      }
    }

    if (props.Role === "Mentor") {
      for (let i = 0; i < Mentors.length; i++) {
        console.log(Mentors[i]?.email);
        if (Mentors[i]?.email?.toLowerCase() === lowerCaseEmail) {
          setVerifiedTrue();
          return true;
        }
      }
    }

    if (props.Role === "Project Admin") {
      for (let i = 0; i < ProjectAdmins.length; i++) {
        if (ProjectAdmins[i].email.toLowerCase() === lowerCaseEmail) {
          setVerifiedTrue();
          return true;
        }
      }
    }

    if (props.Role === "Campus Ambassador") {
      for (let i = 0; i < CampusAmbassadors.length; i++) {
        if (CampusAmbassadors[i].email.toLowerCase() === lowerCaseEmail) {
          setVerifiedTrue();
          return true;
        }
      }
    }

    return false;
  };

  async function Checker(email) {
    const verified = checkIfVerified(email);

    if (verified) {
      setVerifiedTrue();
      const ver_success =
        "Verification successful.\n Badge Unlocked 🎊!!! \n Proceed to download your badge from below. \n\nHope you have a great time learning & contributing with us. All the best for your future endeavors.";
      alert(ver_success);
    } else {
      const ver_failed = `Verification failed.💀\nPlease recheck if you have entered the correct email (used to register in GSSoC'2024 Extended & selected the appropriate allocated role from the dropdown. \n\nIf you still feel something is wrong, feel free to make a ticket on the official server regarding the same.`;
      alert(ver_failed);
    }
  }

  const Switcher = () => {
    if (props.Email && props.Name && (props.Role === "Campus Ambassador" || props.Github) && props.image) {
      Checker(props.Email);
      return true;
    }
    alert("Please enter all the fields.");
    return false;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        alert("Please download the badge certificate on the desktop website");
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center relative overflow-hidden">
        <div
          style={{
            backgroundImage: `url(/badges/2024Extd/BadgeBg.png)`,
          }}
          className={`badge-banner badge-contrib max-[900px]:hidden bg-no-repeat`}
          ref={badgeWrapper}
        >
          <div
            className={`${
              props.verified
                ? "signature-wrapper"
                : "unverified-signature-wrapper"
            }`}
          >
            <Image
              src="/badges/2024Extd/Signatures.png"
              alt="Signature"
              height={60}
              width={200}
              className={`${
                props.verified ? "signature" : "unverified-signature"
              }`}
              draggable="false"
            />
          </div>
          <div className="absolute top-44 left-12">
            <Image
              src="/badges/2024Extd/Extd Logo.png"
              alt="Signature"
              height={40}
              width={120}
              className={`${
                props.verified ? "signature" : "unverified-signature"
              }`}
              draggable="false"
            />
          </div>
          <div className="absolute top-52 right-20">
            <Image
              src="/badges/2024Extd/Extd Logo.png"
              alt="Signature"
              height={60}
              width={200}
              className={`${
                props.verified ? "signature" : "unverified-signature"
              }`}
              draggable="false"
            />
          </div>
          {props.Role === "Contributor" ? (
            <div className="bottom-[190px] flex justify-start items-start left-[125px] text-white bg-[#e85d04] px-3 absolute rounded-full">
              <p>Contributor</p>
            </div>
          ) : props.Role === "Project Admin" ? (
            <div className="bottom-[190px] flex justify-start items-start left-[120px] text-white bg-[#e85d04] px-3 absolute rounded-full">
              <p>Project Admin</p>
            </div>
          ) : props.Role === "Campus Ambassador" ? (
            <div className="bottom-[190px] flex justify-start items-start left-[90px] text-white bg-[#e85d04] px-3 absolute rounded-full">
              <p>Campus Ambassador</p>
            </div>
          ) : props.Role === "Mentor" ? (
            <div className="bottom-[190px] flex justify-start items-start left-[145px] text-white bg-[#e85d04] px-3 absolute rounded-full">
              <p>Mentor</p>
            </div>
          ) : null}
          <div className="bottom-[275px] right-[150px] text-xs font-bold flex justify-start items-start text-white absolute rounded-full">
            <p>
              <span className="text-[#ff3131]">SCAN</span> HERE
            </p>
          </div>
          <div className="bottom-[100px] right-[120px] text-xs flex justify-start items-start text-white absolute rounded-full gap-1">
            <img
              src="/badges/2024Extd/globe.png"
              width={15}
              height={15}
              className="relative top-[1px]"
            />
            <p>gssoc.girlscript.tech</p>
          </div>
          <div className="bottom-[100px] left-[120px] text-xs flex justify-start items-start text-white absolute rounded-full gap-1">
            <img
              src="/badges/2024Extd/globe.png"
              width={15}
              height={15}
              className="relative top-[1px]"
            />
            <p>gssoc.girlscript.tech</p>
          </div>
          <div
            className={`${
              props.verified ? "QR-code-wrapper" : "unverified-QR-code-wrapper"
            }`}
          >
            <Image
              src="/badges/2024Extd/IDBadge_QR.png"
              alt="QR"
              height={100}
              width={100}
              className={`${props.verified ? "QR-code" : "unverified-QR-code"}`}
              draggable="false"
            />
          </div>
          <div className="image-wrapper">
            {props.verified ? (
              <Image
                src={props.verified ? props.image : ""}
                alt={`${props.Role} Badge`}
                height={175}
                width={175}
                className="badge-img"
                draggable="false"
              />
            ) : (
              <></>
            )}
          </div>
          <div
            id="content"
            className={`${
              props.verified ? "badge-content" : "unverified-badge-content"
            } text-white leading-3 text-center`}
          >
            GirlScript Summer of Code Extd is a 1-month long <br />
            Open-Source program by GirlScript Foundation. <br />
            <span className="font-bold">1st Oct 2024 - 30th Oct 2024</span>
          </div>
          <div
            id="contrib_name"
            className={`${
              props.verified ? "badge-name" : "unverified-badge-name"
            } text-2xl text-white leading-5 `}
          >
            {props.verified ? props.Name : "Your Name"}
          </div>
          <h5
            className={`${
              props.verified ? "badge-github" : "unverified-badge-github"
            } text-sm font-bold text-white flex gap-2`}
          >{props.Github && (
            <img src="/badges/2024Extd/github.png" width={20} height={20} />)}
            <span className="font-normal">
              {props.verified ? props.Github : "Github username"}
            </span>
          </h5>
        </div>
      </div>
      <div className="flex justify-center relative overflow-hidden">
        <div
          style={{
            backgroundImage: `url(/badges/2024Extd/BadgeBg.png)`,
          }}
          className={`badge-banner badge-contrib absolute bg-no-repeat left-[5000px] scale-[5]`}
          ref={badgeWrapper}
        >
          <div
            className={`${
              props.verified
                ? "signature-wrapper"
                : "unverified-signature-wrapper"
            }`}
          >
            <Image
              src="/badges/2024Extd/Signatures.png"
              alt="Signature"
              height={60}
              width={200}
              className={`${
                props.verified ? "signature" : "unverified-signature"
              }`}
              draggable="false"
            />
          </div>
          <div className="absolute top-44 left-12">
            <Image
              src="/badges/2024Extd/Extd Logo.png"
              alt="Signature"
              height={40}
              width={120}
              className={`${
                props.verified ? "signature" : "unverified-signature"
              }`}
              draggable="false"
            />
          </div>
          <div className="absolute top-52 right-20">
            <Image
              src="/badges/2024Extd/Extd Logo.png"
              alt="Signature"
              height={60}
              width={200}
              className={`${
                props.verified ? "signature" : "unverified-signature"
              }`}
              draggable="false"
            />
          </div>
          {props.Role === "Contributor" ? (
            <div className="bottom-[190px] flex justify-start items-start left-[125px] text-white bg-[#e85d04] px-3 absolute rounded-full">
              <p className="relative -top-2">Contributor</p>
            </div>
          ) : props.Role === "Project Admin" ? (
            <div className="bottom-[190px] flex justify-start items-start left-[120px] text-white bg-[#e85d04] px-3 absolute rounded-full">
               <p className="relative -top-2">Project Admin</p>
            </div>
          ) : props.Role === "Campus Ambassador" ? (
            <div className="bottom-[190px] flex justify-start items-start left-[90px] text-white bg-[#e85d04] px-3 absolute rounded-full">
               <p className="relative -top-2">Campus Ambassador</p>
            </div>
          ) : props.Role === "Mentor" ? (
            <div className="bottom-[190px] flex justify-start items-start left-[145px] text-white bg-[#e85d04] px-3 absolute rounded-full">
               <p className="relative -top-2">Mentor</p>
            </div>
          ) : null}
          <div className="bottom-[275px] right-[150px] text-xs font-bold flex justify-start items-start text-white absolute rounded-full">
            <p>
              <span className="text-[#ff3131]">SCAN</span> HERE
            </p>
          </div>
          <div className="bottom-[108px] right-[125px] text-xs flex justify-start items-start text-white absolute rounded-full">
            <img
              src="/badges/2024Extd/globe.png"
              width={15}
              height={15}
              className="relative top-[10px]"
            />
            <p>gssoc.girlscript.tech</p>
          </div>
          <div className="bottom-[108px] left-[120px] text-xs flex justify-start items-start text-white absolute rounded-full">
            <img
              src="/badges/2024Extd/globe.png"
              width={15}
              height={15}
              className="relative top-[10px]"
            />
            <p>gssoc.girlscript.tech</p>
          </div>
          <div
            className={`${
              props.verified ? "QR-code-wrapper" : "unverified-QR-code-wrapper"
            }`}
          >
            <Image
              src="/badges/2024Extd/IDBadge_QR.png"
              alt="QR"
              height={100}
              width={100}
              className={`${props.verified ? "QR-code" : "unverified-QR-code"}`}
              draggable="false"
            />
          </div>
          <div className="image-wrapper">
            {props.verified ? (
              <Image
                src={props.verified ? props.image : ""}
                alt={`${props.Role} Badge`}
                height={175}
                width={175}
                className="badge-img"
                draggable="false"
              />
            ) : (
              <></>
            )}
          </div>
          <div
            id="content"
            className={`${
              props.verified ? "badge-content" : "unverified-badge-content"
            } text-white leading-3 text-center`}
          >
            GirlScript Summer of Code Extd is a 1-month long <br />
            Open-Source program by GirlScript Foundation. <br />
            <span className="font-bold">1st Oct 2024 - 30th Oct 2024</span>
          </div>
          <div
            id="contrib_name"
            className={`${
              props.verified ? "badge-name" : "unverified-badge-name"
            } text-2xl text-white leading-6 `}
          >
            {props.verified ? props.Name : "Your Name"}
          </div>
          <h5
            className={`${
              props.verified ? "badge-github" : "unverified-badge-github"
            } text-sm font-bold text-white flex gap-2`}
          >{props.Github && (
            <img src="/badges/2024Extd/github.png" width={20} height={20} className="relative top-1"/>)}
            <span className="font-normal">
              {props.verified ? props.Github : "Github username"}
            </span>
          </h5>
        </div>
      </div>
      <h6 id="no-mobile-alert" className="text-black dark:text-white">
        * Please download the badge certificate on the desktop website
      </h6>
      <Spacer mt={20} />
      <button
        type="button"
        className={
          !props.verified
            ? "bg-gradient-to-b from-primary_orange-0 to-orange-600 text-md  dark:text-black rounded-b-md hover:bg-gradient-to-t hover:from-primary_orange-0 hover:to-orange-600 text-md text-white font-bold px-5 py-1 rounded md:text-xl md:py-3"
            : "dark:text-black bg-gradient-to-b from-slate-600 to-orange-400 text-md w-full mb-3 text-md text-white font-bold px-5 py-1 rounded md:text-xl md:py-3"
        }
        onClick={Switcher}
        disabled={props.verified}
        title={
            props.Email && props.Name && (props.Role === "Campus Ambassador" || props.Github) && props.image
              ? null
              : "Please enter all values"
          }
      >
        Verify
      </button>
      <Spacer mt={5} />
      <button
        type="button"
        className={
          props.verified
            ? "bg-gradient-to-b from-primary_orange-0 to-orange-600 text-md dark:text-black  rounded-b-md hover:bg-gradient-to-t hover:from-primary_orange-0 hover:to-orange-600 text-md text-white font-bold px-5 py-1 rounded md:text-xl md:py-3"
            : "dark:text-black bg-gradient-to-b from-slate-600 to-orange-400 text-md w-full mb-3 text-md text-white font-bold px-5 py-1 rounded md:text-xl md:py-3"
        }
        onClick={DownloadImage}
        disabled={!props.verified}
      >
        Download Badge
      </button>
    </>
  );
};

export default BadgeID_Comp;
