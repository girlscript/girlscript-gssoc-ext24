import React, { useState, useEffect } from "react";
import { SiGithubsponsors } from "react-icons/si";
import Link from "next/link";
import Head from "next/head";
import { Spinner } from "@chakra-ui/react";

function SponsorUs() {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationEmail: "",
    contactName: "",
    contactEmail: "",
    phoneNumber: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight / 2 - window.innerHeight / 2,
      behavior: "smooth",
    });
  }, []);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://gssoc-website-new-lovat.vercel.app/api/sponsor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setIsSubmitting(false);
      if (response.status == 200 || response.status == 201) {
        setShowPopup(true);
        setFormData({
          organizationName: "",
          organizationEmail: "",
          contactName: "",
          contactEmail: "",
          phoneNumber: "",
          notes: "",
        });
      } else {
        let _res = await response.json();
        console.log("error", _res);
      }
    } catch (error) {
      console.error("Unexpected error", error);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.href = "/";
  };

  return (
    <>
      <Head>
        <title>
          Sponsor Us | GirlScript Summer of Code 2024 | GirlScript
          Foundation India
        </title>
        <meta
          name="description"
          content="Sponsor Us of GirlScript Summer of Code"
        />
      </Head>
      {isSubmitting && (
        <div className="loader-div">
          <div className="overlay dark:bg-darkmode_gray-0"></div>
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
              <span className="loading-msg dark:text-white">loading...</span>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-full relative">
        <div className="w-full h-full absolute">
          <div className="relative h-full w-full">
            <img
              src="https://github.com/user-attachments/assets/d22f4ba6-99c8-4f70-bebb-293e913b0403"
              className="absolute bottom-12 right-12"
              alt="Sponsor 1"
            />
            <img
              src="https://github.com/user-attachments/assets/24f55e89-073f-4f60-a8da-9a8bd8f1fb22"
              className="absolute top-52 left-8 max-sm:hidden"
              alt="Sponsor 2"
            />
            <img
              src="https://github.com/user-attachments/assets/79abccc7-f149-47c5-9718-0f2bad78ed05"
              className="absolute bottom-0"
              alt="Sponsor 3"
            />
            <img
              src="https://github.com/user-attachments/assets/02c086cd-24ba-427e-b766-bd3aac3a6626"
              className="absolute top-0 right-0 h-32 w-96"
              alt="Sponsor 4"
            />
            <img
              src="https://github.com/user-attachments/assets/7a87e4b9-de02-421b-852b-6d842171697e"
              className="absolute top-0 right-80 h-12"
              alt="Sponsor 5"
            />
          </div>
        </div>
        <div className="flex min-h-screen dark:text-white flex-col justify-center items-center max-w-6xl mx-auto relative w-full py-20 max-sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-lg text-center font-medium italic px-16 max-sm:px-8 mb-2">
            GirlScript Summer of Code is a platform where students learn,
            contribute, and grow in the field of open-source development. By
            sponsoring GSSoC, you help empower future tech innovators, promote
            diversity, and contribute to creating a more inclusive community.
          </div>
          <div className="text-xl my-8 text-center font-medium dark:text-white">
            Visit{" "}
            <span className="text-primary_orange-0 hover:underline">
              <Link href="/whySponsorUs">WHY SPONSOR US?</Link>
            </span>{" "}
            for more information
          </div>
          <div className="text-3xl my-8 text-center font-medium">
            OUR PREVIOUS SPONSORS
          </div>
          <div className="flex w-full flex-wrap gap-12 justify-between max-lg:justify-center">
            <div className="flex justify-center items-center w-36 h-40">
              <img src="/Sponsors/Postman.png" alt="Postman" />
            </div>
            <div className="flex justify-center items-center w-36 h-40">
              <img src="/Sponsors/Vercel.png" alt="" />
            </div>
            <div className="flex justify-center items-center w-40 h-40">
              <img src="/Sponsors/BlueLearn.png" alt="" />
            </div>
            <div className="flex justify-center items-center w-24 h-40">
              <img src="/Sponsors/dotXYZ.png" alt="" />
            </div>
            <div className="flex justify-center items-center w-36 h-40">
              <img
                src="https://quine.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F156089b0-a252-474d-9a70-3ca3d1700807%2FProperty_1Variant4.svg?table=block&id=976f5669-d89e-449f-9d80-7aa14df8229c&spaceId=a8bb25df-0bb7-49ae-b3bb-6496fd5b7326&userId=&cache=v2"
                alt=""
              />
            </div>
          </div>
          <div className="text-3xl my-8 text-center font-medium">
            WISH TO CONTRIBUTE IN OUR ENDEAVOUR? SPONSOR US
          </div>
          <div className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label
                    htmlFor="organizationName"
                    className="text-sm font-medium text-gray-700 flex gap-1 dark:text-white"
                  >
                    ORGANIZATION/ INDIVIDUAL NAME{" "}
                    <span className="text-xs text-red-500">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="mt-1 px-2 block dark:bg-slate-100 dark:text-black w-full h-10 border-black border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="organizationEmail"
                    className="text-sm font-medium text-gray-700 flex gap-1 dark:text-white"
                  >
                    ORGANIZATION EMAIL ID{" "}
                    <span className="text-xs text-red-500">(required)</span>
                  </label>
                  <input
                    type="email"
                    id="organizationEmail"
                    value={formData.organizationEmail}
                    onChange={handleChange}
                    className="mt-1 px-2 block w-full dark:bg-slate-100 dark:text-black h-10 border-black border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactName"
                    className="text-sm font-medium text-gray-700 flex gap-1 dark:text-white"
                  >
                    NAME OF PERSON OF CONTACT{" "}
                    <span className="text-xs text-red-500">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="mt-1 px-2 dark:bg-slate-100 dark:text-black block w-full h-10 border-black border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-8">
                <div>
                  <label
                    htmlFor="contactEmail"
                    className="text-sm font-medium text-gray-700 flex gap-1 dark:text-white"
                  >
                    POC EMAIL-ID{" "}
                    <span className="text-xs text-red-500">(required)</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="mt-1 px-2 block dark:bg-slate-100 dark:text-black w-full h-10 border-black border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700 flex gap-1 dark:text-white"
                  >
                    POC PHONE NUMBER{" "}
                    <span className="text-xs text-red-500">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 dark:bg-slate-100 dark:text-black px-2 block w-full h-10 border-black border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="text-sm font-medium text-gray-700 flex gap-1 dark:text-white"
                  >
                    NOTES{" "}
                    <span className="text-xs text-red-500">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 dark:bg-slate-100 dark:text-black px-2 block w-full h-10 border-black border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 max-md:justify-center">
                <button
                  type="submit"
                  className="bg-[#df551a] hover:bg-[#e36b38] rounded-lg text-white text-lg font-medium w-36 py-2 px-4 text-center"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
          <div className="mt-10">
            <div className="flex flex-col justify-center items-center gap-5 p-5">
              <h5 className="font-bold text-lg text-center">
                Want to support our organization? Sponsor us on GitHub
                through github sponsors
              </h5>
              <a
                href="https://github.com/sponsors/GSSoC24"
                rel="noreferrer"
                target="_blank"
                className=" no-underline "
              >
                <button className="bg-[#df551a] flex justify-center items-center gap-5 p-5 border-2 w-auto hover:bg-[#e36b38] rounded-lg text-white text-lg font-medium py-2 px-4 text-center">
                  <SiGithubsponsors /> Sponsor Us
                </button>
              </a>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center relative border-2 border-black border-dotted">
              <div className="h-40 overflow-hidden flex items-center justify-center">
                <img
                  src="https://github.com/user-attachments/assets/c5a4d3b9-a507-499f-8909-e6b69abd9b8a"
                  alt="Banner"
                  width={400}
                />
              </div>

              <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
              <hr />
              <p className="text-lg mb-12 max-w-xl w-full">
                We truly appreciate your interest in sponsoring us! Our team
                will get in touch with you within the next 5 days.
                <br />
                In the meantime, feel free to explore our{" "}
                <strong>Sponsor Deck</strong> to learn more about the exciting
                opportunities we offer.
              </p>

              <a
                href="https://github.com/user-attachments/files/16929232/GSSoC.24.Sponsorship.deck-indian.2.pdf"
                download
                className="inline-block bg-[#F96727] hover:bg-[#e36b38] text-white py-2 px-4 rounded-lg mb-4 mr-2"
              >
                Download Sponsor Deck
              </a>

              <button
                onClick={handleClosePopup}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SponsorUs;
