"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CountryStateSelect from "../components/CountryStateSelect";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Head from "next/head";

const UploadField = ({ name, label, onChange, preview, setuploadedFile }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      if (selectedFile.size > 1266126) {
        setError("* File size should be less than 1 MB");
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Url = reader.result;
          setFile(base64Url);
          setError("");
          setIsUploaded(true);
          setuploadedFile(base64Url);
          onChange(event);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  return (
    <div className="upload-field">
      <label
        htmlFor={name}
        className="bg-[#F86F26] px-4 rounded-lg py-2 cursor-pointer text-white font-semibold"
      >
        {isUploaded ? "Uploaded" : label}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        onChange={handleChange}
        className="hidden"
      />
      {error && <p className="error text-red-600 mt-3">{error}</p>}
      {file && (
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4"
        >
          {preview ? (
            <embed src={file} type="application/pdf" width="600" height="400" />
          ) : (
            "View File"
          )}
        </a>
      )}
    </div>
  );
};

const Registration = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const [selectedTimer, setSelectedTimer] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [caTimeLeft, setCaTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [paTimeLeft, setPaTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [contributorTimeLeft, setContributorTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [mentorTimeLeft, setMentorTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isTimeUp, setIsTimeUp] = useState(false);
  useEffect(() => {
    if (role == "") {
      setSelectedTimer(caTimeLeft);
    } else if (role == "Contributor") {
      setSelectedTimer(contributorTimeLeft);
    } else if (role == "Mentor") {
      setSelectedTimer(mentorTimeLeft);
    } else if (role == "ProjectAdmin") {
      setSelectedTimer(paTimeLeft);
    }
  }, [caTimeLeft]);
  const caTargetDate = new Date(2024, 8, 13, 17, 30, 0);
  const paTargetDate = new Date(2024, 8, 14, 17, 30, 0);
  const contributorTargetDate = new Date(2024, 8, 15, 17, 30, 0);
  const mentorTargetDate = new Date(2024, 8, 14, 17, 30, 0);
  useEffect(() => {
    if (router?.query?.referral) {
      setFormData({
        ...formData,
        referral: router?.query?.referral,
      });
    }
  }, [router?.query]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const calculateTimeLeft = (target) => {
        const distance = target - now;
        if (distance < 0) return { hours: "00", minutes: "00", seconds: "00" };

        const totalHours = String(
          Math.floor(distance / (1000 * 60 * 60))
        ).padStart(2, "0");
        const minutes = String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");
        const seconds = String(
          Math.floor((distance % (1000 * 60)) / 1000)
        ).padStart(2, "0");
        return { hours: totalHours, minutes, seconds };
      };
      setCaTimeLeft(calculateTimeLeft(caTargetDate));
      setPaTimeLeft(calculateTimeLeft(paTargetDate));
      setContributorTimeLeft(calculateTimeLeft(contributorTargetDate));
      setMentorTimeLeft(calculateTimeLeft(mentorTargetDate));
      if (caTargetDate - now < 0 && !isTimeUp) {
        setIsTimeUp(true);
        setIsRegistrationsOpen(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [caTargetDate, paTargetDate, contributorTargetDate, mentorTargetDate]);

  const isRoleTimerUp = {
    CA: caTargetDate - new Date() < 0,
    Contributor: contributorTargetDate - new Date() < 0,
    Mentor: mentorTargetDate - new Date() < 0,
    ProjectAdmin: paTargetDate - new Date() < 0,
  };

   const handleNext = () => {
    if (currentStep === 1) {
      if (!role) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          role: "Please select a role before proceeding.",
        }));
        return;
      }
      if (router?.query?.referral) {
        setFormData({
          ...formData,
          referral: router?.query?.referral,
        });
      }
  
      if (role !== "CA" && !isRoleTimerUp[role]) {
        const timerState = {
          CA: caTimeLeft,
          Contributor: contributorTimeLeft,
          Mentor: mentorTimeLeft,
          ProjectAdmin: paTimeLeft,
        }[role];
  
        setCurrentStep(2);
        setSelectedTimer(timerState);
        setErrors((prevErrors) => ({
          ...prevErrors,
          role: `Please wait until the ${role} timer hits 0. Time left: ${formatTimeLeft(
            timerState
          )}`,
        }));
        setIsNext(true);
        return;
      }
  
      setIsNext(true);
      setCurrentStep(currentStep + 1);
      setErrors((prevErrors) => ({
        ...prevErrors,
        role: "",
      }));
      return;
    }

    if (currentStep === 2) {
      let newErrors = {};

      if (!formData.firstName) newErrors.firstName = "Name is required.";
      if (!formData.collegeOrOffice)
        newErrors.collegeOrOffice = "College/Office is required.";
      if (!formData.gender) newErrors.gender = "Gender is required.";
      if (!formData.gitHubProfileUrl)
        newErrors.gitHubProfileUrl = "Github Profile is required.";
      if (!formData.discordUsername)
        newErrors.discordUsername = "Discord username is required.";
      if (!formData.linkedInProfileUrl)
        newErrors.linkedInProfileUrl = "LinkedIn Profile is required.";
      if (!formData.phoneNumber)
        newErrors.phoneNumber = "Phone number is required.";
      if (formData.phoneNumber === "+91")
        newErrors.phoneNumber = "Phone number is required.";
      if (!formData.email) newErrors.email = "Email is required.";
      if (Object.keys(newErrors).length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...newErrors,
        }));
        return; 
      }
      setIsNext(true);
      setCurrentStep(currentStep + 1);
      setErrors((prevErrors) => ({
        ...prevErrors,
      }));
    }
  };
  

  const formatTimeLeft = (timeLeft) => {
    const { hours, minutes } = timeLeft;
    return `${hours} hours and ${minutes} minutes`;
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({});
    setIsNext(false);
  };

  const handleCountryChange = (selectedCountry) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedCountry ? selectedCountry.label : "",
      state: "",
    }));
  };

  const handleStateChange = (selectedState) => {
    setFormData((prevData) => ({
      ...prevData,
      state: selectedState ? selectedState.label : "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "email" && !validateEmail(value)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email address.",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const handlePhoneChange = (value, countryData) => {
    const formattedPhone = `+${countryData.dialCode} ${value.slice(
      countryData.dialCode.length
    )}`;
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: formattedPhone,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Name is required.";
    if (!formData.collegeOrOffice)
      newErrors.collegeOrOffice = "College/Office is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.gitHubProfileUrl)
      newErrors.gitHubProfileUrl = "Github Profile is required.";
    if (!formData.discordUsername)
      newErrors.discordUsername = "Discord username is required.";
    if (!formData.linkedInProfileUrl)
      newErrors.linkedInProfileUrl = "Linkedin Profile is required.";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "phoneNumber is Required";
    if (formData.phoneNumber == "+91")
      newErrors.phoneNumber = "phoneNumber is Required";
    if (role === "ProjectAdmin") {
      if (!formData.projectName)
        newErrors.projectName = "Project Name is Required";
      if (!formData.techStacks) newErrors.techStacks = "Tech Stack is Required";
      if (!formData.repositoryUrl)
        newErrors.repositoryUrl = "Repository URL is Required";
      if (!formData.projectDescription)
        newErrors.projectDescription = "Project Description is Required";
    }
    if (role != "ProjectAdmin") {
      if (!formData.reason) newErrors.reason = "Reason is Required";
    }
    if (role === "Mentor") {
      if (!formData.techStacks) newErrors.techStacks = "Tech Stack is Required";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const fullName = [
      formData.firstName,
      formData.middleName,
      formData.lastName,
    ]
      .filter((name) => name)
      .join(" ");
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors);
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    const finalData = {
      role,
      ...formData,
      name: fullName,
    };
    Object.keys(finalData).forEach((key) => {
      if (!finalData[key]) {
        delete finalData[key];
      }
    });

    delete finalData.firstName;
    delete finalData.middleName;
    delete finalData.lastName;

    try {
      const response = await axios.post(
        "https://gssoc-website-new-lovat.vercel.app/api/registration",
        finalData
      );
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error registering. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setShowSuccess(false);
    window.location.href = "/";
  };
  const [isNext, setIsNext] = useState(false);
  const timerDigits = [
    ...selectedTimer.hours.split(""),
    ...selectedTimer.minutes.split(""),
    ...selectedTimer.seconds.split(""),
  ];
  const [uploadedFile, setuploadedFile] = useState("");
  useEffect(() => {
    if (uploadedFile) {
      setFormData({
        ...formData,
        resumeUpload: uploadedFile,
      });
    }
  }, [uploadedFile]);
  const handleFileChange = (e) => {
    console.log("");
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="w-full h-full absolute">
              <div className="relative h-full w-full">
                <img
                  src="https://github.com/user-attachments/assets/d22f4ba6-99c8-4f70-bebb-293e913b0403"
                  className="absolute bottom-12 right-12 max-sm:hidden"
                />
                <img
                  src="https://github.com/user-attachments/assets/24f55e89-073f-4f60-a8da-9a8bd8f1fb22"
                  className="absolute top-44 -left-8 w-24 max-sm:hidden"
                />
                <img
                  src="https://github.com/user-attachments/assets/24f55e89-073f-4f60-a8da-9a8bd8f1fb22"
                  className="absolute bottom-32 left-52 w-24 max-sm:hidden"
                />
                <img
                  src="https://github.com/user-attachments/assets/24f55e89-073f-4f60-a8da-9a8bd8f1fb22"
                  className="absolute top-52 right-44 rotate-90 w-24 max-sm:hidden"
                />
                <img
                  src="https://github.com/user-attachments/assets/a6e369a7-7767-4798-9c20-cb51afc06678"
                  className="absolute bottom-0 right-0 max-sm:hidden"
                />
                <img
                  src="https://github.com/user-attachments/assets/ada374a4-ef3a-40c7-a9ce-45233140a854"
                  className="absolute bottom-0 "
                />
                <img
                  src="https://github.com/user-attachments/assets/9b6b63d7-6e9a-409d-a9cd-9479a537a5b3"
                  className="absolute bottom-0 right-[450px]"
                />
                <img
                  src="https://github.com/user-attachments/assets/02c086cd-24ba-427e-b766-bd3aac3a6626"
                  className="absolute top-0 right-0 h-32 w-96"
                />
                <img
                  src="https://github.com/user-attachments/assets/7a87e4b9-de02-421b-852b-6d842171697e"
                  className="absolute top-0 right-80 h-12"
                />
              </div>
            </div>
            {!isTimeUp && !isRegistrationsOpen && (
              <div>
                <h1 className="text-2xl font-normal text-center max-[400px] mt-20 mb-16 w-full max-w-3xl m-auto">
                  <span className="font-bold text-[#f57d33]">
                    Are you excited?
                  </span>{" "}
                  The countdown to become a{" "}
                  <span className="font-bold text-[#f57d33]">
                    Campus Ambassador
                  </span>{" "}
                  with us has started!
                </h1>
                <div className="flex gap-6 max-sm:gap-3 max-sm:mt-20 items-center">
                  {timerDigits.map((digit, index) => (
                    <div
                      className="flex flex-col justify-center items-center gap-4"
                      key={index}
                    >
                      <div className="flex justify-center items-center gap-4">
                        <div className="relative">
                          <div className="bg-[#f57d33] w-24 h-24 max-sm:w-12 max-sm:h-12 max-[400px]:h-10 max-[400px]:w-10 border-[#f57d33] z-20 border-2 rounded-xl flex items-center justify-center"></div>
                          <div className="bg-white absolute bottom-2 right-2 z-10 w-24 h-24 max-sm:w-12 max-sm:h-12 max-[400px]:h-10 max-[400px]:w-10 border-[#f57d33] border-2 rounded-xl">
                            <span className="text-black text-2xl max-sm:font-semibold font-bold flex justify-center items-center h-full">
                              {digit}
                            </span>
                          </div>
                        </div>
                        {index % 2 !== 0 &&
                          index !== timerDigits.length - 1 && (
                            <div className="flex flex-col gap-4">
                              <div className="bg-[#f57d33] w-4 h-4 max-sm:w-2 max-sm:h-2 rounded-full"></div>
                              <div className="bg-[#f57d33] w-4 h-4 max-sm:w-2 max-sm:h-2 rounded-full"></div>
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center flex justify-around items-center w-full mt-6 max-w-3xl m-auto font-normal text-[#676767] text-2xl">
                  <span>Hours</span>
                  <span>Mins</span>
                  <span>Seconds</span>
                </div>
              </div>
            )}
            {role !== "CA" && role !== "" && isNext && (
              <div>
                {/* <h1 className="text-2xl font-normal text-center mt-20 mb-16 w-full max-w-3xl mx-auto">
                  <span className="font-bold text-[#f57d33]">
                    Please Wait !
                  </span>{" "}
                  Registrations for{" "}
                  <span className="font-bold text-[#f57d33]">{role}</span>{" "}
                  haven&apos;t opened yet. Stay tuned, and check back soon for
                  updates.
                </h1>
                <div>
                  <div className="flex gap-6 max-sm:gap-3 max-sm:mt-20 items-center">
                    {timerDigits.map((digit, index) => (
                      <div
                        className="flex justify-center items-center gap-4"
                        key={index}
                      >
                        <div className="relative">
                          <div className="bg-[#f57d33] w-24 h-24 max-sm:w-16 max-sm:h-16 border-[#f57d33] z-20 border-2 rounded-xl flex items-center justify-center"></div>
                          <div className="bg-white absolute bottom-2 right-2 z-10 w-24 h-24 max-sm:w-16 max-sm:h-16 border-[#f57d33] border-2 rounded-xl">
                            <span className="text-black text-2xl font-bold flex justify-center items-center h-full">
                              {digit}
                            </span>
                          </div>
                        </div>
                        {index % 2 !== 0 &&
                          index !== timerDigits.length - 1 && (
                            <div className="flex flex-col gap-4">
                              <div className="bg-[#f57d33] w-4 h-4 max-sm:w-3 max-sm:h-3 rounded-full"></div>
                              <div className="bg-[#f57d33] w-4 h-4 max-sm:w-3 max-sm:h-3 rounded-full"></div>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center flex justify-around items-center w-full mt-6 max-w-3xl m-auto font-normal text-[#676767] text-2xl">
                    <span>Hours</span>
                    <span>Mins</span>
                    <span>Seconds</span>
                  </div>
                </div> */}
              </div>
            )}
            {isRegistrationsOpen && (
              <div className="shadow-lg rounded-xl p-8 max-w-6xl border-[1px] border-black w-full z-40">
                <h1 className="text-2xl font-semibold text-center mb-6">
                  REGISTER
                </h1>
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 flex gap-1 items-center my-2">
                    CHOOSE YOUR PREFERRED ROLE{" "}
                    <span className="text-xs text-red-500">(required)</span>
                  </label>
                  <select
                    className="block w-full p-3 border bg-white border-gray-600 rounded-md shadow-sm focus:ring-[#f57d33] focus:border-[#f57d33]"
                    onChange={handleRoleChange}
                    value={role}
                  >
                    <option value="" disabled>
                      Which role do you wish to apply for?
                    </option>
                    <option value="CA">Campus Ambassador</option>
                    <option value="Contributor">Contributor</option>
                    <option value="Mentor">Mentor</option>
                    <option value="ProjectAdmin">Project Admin</option>
                  </select>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-[#f57d33] text-white py-2 px-4 rounded-lg shadow hover:bg-[#F26611] w-40"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            <div className="flex w-full flex-wrap gap-24 max-sm:gap-4 my-10 justify-center z-40 max-lg:justify-center">
              <div className="flex justify-center items-center w-36">
                <img src="/Sponsors/Vercel.png" alt="" />
              </div>
              <div className="flex justify-center items-center w-48 ">
                <img src="/Sponsors/Postman.png" alt="Postman" />
              </div>
              <div className="flex justify-center items-center w-24">
                <img src="/Sponsors/dotXYZ.png" alt="" />
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="w-full h-full absolute overflow-hidden">
              <div className="relative h-full w-full">
                <img
                  src="https://github.com/user-attachments/assets/d22f4ba6-99c8-4f70-bebb-293e913b0403"
                  className="absolute bottom-12 left-96"
                />
                <img
                  src="https://github.com/user-attachments/assets/24f55e89-073f-4f60-a8da-9a8bd8f1fb22"
                  className="absolute top-96 right-24 rotate-90 w-24 max-sm:hidden"
                />
                <img
                  src="https://github.com/user-attachments/assets/24f55e89-073f-4f60-a8da-9a8bd8f1fb22"
                  className="absolute top-96 -left-8 rotate-90 w-24 max-sm:hidden"
                />
                <img
                  src="https://github.com/user-attachments/assets/9b6b63d7-6e9a-409d-a9cd-9479a537a5b3"
                  className="absolute bottom-0 left-0 z-20"
                />
                <img
                  src="https://github.com/user-attachments/assets/79abccc7-f149-47c5-9718-0f2bad78ed05"
                  className="absolute -bottom-6 left-40"
                />
                <img
                  src="https://github.com/user-attachments/assets/02c086cd-24ba-427e-b766-bd3aac3a6626"
                  className="absolute top-0 right-0 h-32 w-96"
                />
                <img
                  src="https://github.com/user-attachments/assets/7a87e4b9-de02-421b-852b-6d842171697e"
                  className="absolute top-0 right-80 h-12"
                />
              </div>
            </div>
            {role != "CA" ? (
            <div className="min-h-screen p-10 max-sm:p-2 max-sm:my-10 w-full flex flex-col items-center justify-center z-30">
              <h1 className="text-2xl font-semibold text-center mb-6">
                REGISTER FOR GSSOC&apos; EXTD.
              </h1>
              <div className="max-w-5xl w-full">
                <div className="my-2 font-medium">PERSONAL DETAILS</div>
                <div className="border-[1px] border-gray-400 rounded-lg p-4 w-full bg-gray-100">
                  <div className="flex max-lg:flex-wrap gap-4 items-center">
                    <InputField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      handleChange={handleInputChange}
                      error={errors.firstName}
                      required={true}
                    />

                    <InputField
                      label="Middle Name (Optional)"
                      value={formData.middleName}
                      name="middleName"
                      handleChange={handleInputChange}
                      required={false}
                    />

                    <InputField
                      label="Last Name (Optional)"
                      value={formData.lastName}
                      name="lastName"
                      handleChange={handleInputChange}
                      required={false}
                    />
                  </div>
                  <div className="flex max-lg:flex-wrap gap-4">
                    <div className="flex-grow">
                      <SelectField
                        label="Gender"
                        value={formData.gender}
                        name="gender"
                        required={true}
                        options={["Select Gender", "Male", "Female", "Others"]}
                        handleChange={handleInputChange}
                        error={errors.gender}
                      />
                    </div>
                    <div className="flex-grow-2">
                      <CountryStateSelect
                        state={formData.state}
                        country={formData.country}
                        onCountryChange={handleCountryChange}
                        onStateChange={handleStateChange}
                      />
                    </div>
                    <div className="flex-grow">
                      <InputField
                        label="City"
                        name="city"
                        value={formData.city}
                        handleChange={handleInputChange}
                        error={errors.city}
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="flex max-lg:flex-wrap gap-4">
                    <InputField
                      label="College/Office Name"
                      name="collegeOrOffice"
                      value={formData.collegeOrOffice}
                      handleChange={handleInputChange}
                      error={errors.collegeOrOffice}
                    />
                    <SelectField
                      label="Year"
                      name="year"
                      options={[
                        "Select Year",
                        "1st Year",
                        "2nd Year",
                        "3rd Year",
                        "4th Year",
                      ]}
                      handleChange={handleInputChange}
                      value={formData.year}
                      error={errors.year}
                      required={false}
                    />
                    <InputField
                      label="Field of Study"
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      handleChange={handleInputChange}
                      error={errors.fieldOfStudy}
                      required={false}
                    />
                  </div>
                </div>
                <div className="max-w-5xl w-full">
                  <div className="my-2 font-medium">CONTACT DETAILS</div>
                  <div className="border-[1px] border-gray-400 rounded-lg p-8 w-full z-10 bg-gray-100">
                    <div className="flex max-lg:flex-wrap gap-4">
                      <div className="flex-grow">
                        <InputField
                          label="Email"
                          name="email"
                          value={formData.email}
                          handleChange={handleInputChange}
                          error={errors.email}
                        />
                      </div>
                      <div className="mb-6 flex-grow-2">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Phone Number{" "}
                          <span className="text-xs text-red-500">required</span>
                        </label>
                        <PhoneInput
                          country={"in"}
                          value={formData.phoneNumber || ""}
                          onChange={(value, countryData) =>
                            handlePhoneChange(value, countryData)
                          }
                          inputProps={{
                            name: "phoneNumber",
                            required: true,
                            autoFocus: true,
                            onFocus: handleFocus,
                            onBlur: handleBlur,
                          }}
                          inputStyle={{
                            width: "100%",
                            padding: "10px 50px",
                            border: `1px solid ${
                              isFocused ? "#ff7e34" : "#000"
                            }`,
                            boxShadow: isFocused ? "0 0 0 1px #ff7e34" : "none",
                            borderRadius: "4px",
                          }}
                          buttonStyle={{
                            border: "1px solid #000",
                          }}
                        />

                        {errors.phoneNumber && (
                          <span className="mt-1 text-xs text-red-600">
                            {errors.phoneNumber}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex max-lg:flex-wrap gap-4">
                      <InputField
                        label="GitHub Profile URL"
                        name="gitHubProfileUrl"
                        value={formData.gitHubProfileUrl}
                        handleChange={handleInputChange}
                        error={errors.gitHubProfileUrl}
                      />
                      <InputField
                        label="LinkedIn Profile URL"
                        name="linkedInProfileUrl"
                        value={formData.linkedInProfileUrl}
                        handleChange={handleInputChange}
                        error={errors.linkedInProfileUrl}
                      />
                      <InputField
                        label="Discord Username (If none, enter N/A)"
                        name="discordUsername"
                        value={formData.discordUsername}
                        handleChange={handleInputChange}
                        error={errors.discordUsername}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-8 max-sm:gap-2 max-sm:justify-center justify-end">
                  <div className="mt-6 flex justify-end">
                    <button
                      className="border-[#f57d33] border-2 font-bold  text-[#f57d33] py-2 px-4 rounded-lg shadow hover:bg-[#F26611] hover:text-white w-40"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      className="bg-[#f57d33] text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-[#F26611] w-40"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>) : (
      <div className="min-h-screen p-10 max-sm:p-2 max-sm:my-10 w-full flex flex-col items-center justify-center z-30">
        <img src="https://github.com/user-attachments/assets/6ba0f38c-a28d-4d22-835a-93779f126e46" alt="Closed" width={240}/>
      <h1 className="text-2xl font-semibold text-center mb-6">
        <span className="text-[#f57d33] font-bold">Registrations</span> for  <span className="text-[#f57d33] font-bold">Campus Ambassadors</span> in GSSoC 2024 Extd are <span className="text-[#f57d33] font-bold">closed</span>.
      </h1>
      <p className="text-lg text-center mb-6 w-full max-w-2xl">
      We warmly invite you to join us as a Contributor and be part of GSSoC 2024 Extended. We encourage you to register and make an impact!
      </p>
      <button
        className="bg-[#f57d33] text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-[#F26611]"
        onClick={handleBack}
      >
        Go Back
      </button>
      </div>
    )}
          </>
        );
      case 3:
        return (
          <>
            <div className="w-full h-full absolute">
              <div className="relative h-full w-full">
                <img
                  src="https://github.com/user-attachments/assets/d22f4ba6-99c8-4f70-bebb-293e913b0403"
                  className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-24 md:w-32"
                />
                <img
                  src="https://github.com/user-attachments/assets/d22f4ba6-99c8-4f70-bebb-293e913b0403"
                  className="absolute top-12 left-6 md:top-24 md:left-12 w-24  md:w-32 max-sm:hidden"
                />
                <img
                  src="https://github.com/user-attachments/assets/69397759-5ce7-48cc-bb18-c65b8946b13c"
                  className="absolute top-0 right-0 w-32 md:w-96 md:h-48"
                />
                <img
                  src="https://github.com/user-attachments/assets/ceb18aa5-d438-446e-8ea9-8f996769f6a8"
                  className="absolute bottom-0 left-0 w-32 md:w-96 md:h-48"
                />
              </div>
            </div>

            <div className="min-h-screen w-full p-6 md:p-10 bg-gray-100 flex flex-col items-center justify-center">
              <h1 className="text-2xl md:text-3xl font-medium text-center mb-8 md:mb-12 z-20">
                {role === "CA"
                  ? "BECOME A CAMPUS AMBASSADOR"
                  : role === "Contributor"
                  ? "BECOME A CONTRIBUTOR"
                  : role === "ProjectAdmin"
                  ? "BECOME A PROJECT ADMIN"
                  : "BECOME A MENTOR"}
              </h1>

              <div className="flex flex-col justify-center w-full md:flex-row items-center">
                <div className="w-72 h-72 md:w-96 md:h-[450px] z-30 my-12">
                  {role === "CA" && (
                    <img src="./register/caBanner.webp" alt="Banner" />
                  )}
                  {role === "Contributor" && (
                    <img src="./register/contributorBanner.webp" alt="Banner" />
                  )}
                  {role === "ProjectAdmin" && (
                    <img src="./register/paBanner.webp" alt="Banner" />
                  )}
                  {role === "Mentor" && (
                    <img src="./register/mentorBanner.webp" alt="Banner" />
                  )}
                </div>

                <div className="p-4 md:p-8 max-w-lg md:max-w-3xl w-full z-10">
                  {role === "CA" && (
                    <>
                      <TextAreaField
                        label="WHY DO YOU WISH TO BECOME A CAMPUS AMBASSADOR?"
                        name="reason"
                        handleChange={handleInputChange}
                        error={errors.reason}
                      />

                      <TextAreaField
                        label="DO YOU HAVE ANY PAST EXPERIENCE AS A CAMPUS AMBASSADOR? 
                  SHARE YOUR EXPERIENCE BRIEFLY"
                        name="partOfProgramBefore"
                        handleChange={handleInputChange}
                        error={errors.partOfProgramBefore}
                        required={false}
                      />

                      <InputField
                        label="REFERRAL CODE (If none, enter N/A)"
                        name="referral"
                        handleChange={router?.query?.referral ?()=>{} :handleInputChange}
                        error={errors.referral}
                        required={false}
                        value={formData.referral || ""}
                        readonly={router?.query?.referral ? true : false}
                      />
                      <SelectField
                        label="DO YOU HAVE A STARTUP AND ARE SEEKING SERVICES? SELECT 'YES' TO RECEIVE FUTURE BULDER.AI UPDATES (OPTIONAL)"
                        name="startupServices"
                        options={["", "YES", "NO"]}
                        handleChange={handleInputChange}
                        error={errors.startupServices}
                        required={false}
                      />
                      {formData.gender && formData.gender === "Female" && (
                        <div className="mb-4">
                          <div className="block text-sm font-semibold text-gray-800 mb-4">
                            IF YOU WISH TO HAVE YOUR RESUME SHARED WITH
                            COMPANIES, PLEASE UPLOAD YOUR RESUME (OPTIONAL)
                          </div>
                          <UploadField
                            name="resume"
                            label="Upload Resume"
                            onChange={handleFileChange}
                            preview={false}
                            setuploadedFile={setuploadedFile}
                          />
                        </div>
                      )}
                    </>
                  )}

                  {role === "Contributor" && (
                    <>
                      <TextAreaField
                        label="WHY DO YOU WISH TO BECOME A CONTRIBUTOR?"
                        name="reason"
                        handleChange={handleInputChange}
                        error={errors.reason}
                      />
                      <InputField
                        label="DO YOU HAVE ANY PAST EXPERIENCE AS AN OPEN-SOURCE CONTRIBUTOR 
SHARE YOUR EXPERIENCE BRIEFLY"
                        name="partOfProgramBefore"
                        handleChange={handleInputChange}
                        error={errors.partOfProgramBefore}
                        required={false}
                      />
                      <InputField
                        label="REFERRAL CODE (If none, enter N/A)"
                        name="referral"
                        handleChange={router?.query?.referral ?()=>{} :handleInputChange}
                        error={errors.referral}
                        required={false}
                        value={formData.referral || ""}
                        readonly={router?.query?.referral ? true : false}
                      />
                      <SelectField
                        label="DO YOU HAVE A STARTUP AND ARE SEEKING SERVICES? SELECT 'YES' TO RECEIVE FUTURE BULDER.AI UPDATES (OPTIONAL)"
                        name="startupServices"
                        options={["", "YES", "NO"]}
                        handleChange={handleInputChange}
                        error={errors.startupServices}
                        required={false}
                      />
                      {formData.gender && formData.gender === "Female" && (
                        <div className="mb-4">
                          <div className="block text-sm font-semibold text-gray-800 mb-4">
                            IF YOU WISH TO HAVE YOUR RESUME SHARED WITH
                            COMPANIES, PLEASE UPLOAD YOUR RESUME (OPTIONAL)
                          </div>
                          <UploadField
                            name="resume"
                            label="Upload Resume"
                            onChange={handleFileChange}
                            preview={false}
                            setuploadedFile={setuploadedFile}
                          />
                        </div>
                      )}
                    </>
                  )}

                  {role === "ProjectAdmin" && (
                    <>
                      <div className="flex gap-10">
                        <InputField
                          label="NAME OF THE PROJECT"
                          name="projectName"
                          handleChange={handleInputChange}
                          error={errors.projectName}
                          gap={"mb-2"}
                          required={true}
                        />
                        <InputField
                          label="TECHSTACK"
                          name="techStacks"
                          handleChange={handleInputChange}
                          error={errors.techStacks}
                          gap={"mb-2"}
                          required={true}
                        />
                      </div>
                      <div className="flex gap-10">
                        <InputField
                          label="NAME OF THE ORGANIZATION"
                          name="organisationName"
                          handleChange={handleInputChange}
                          error={errors.organisationName}
                          required={false}
                          gap={"mb-2"}
                        />
                        <InputField
                          label="REPOSITORY URL"
                          name="repositoryUrl"
                          handleChange={handleInputChange}
                          error={errors.repositoryUrl}
                          gap={"mb-2"}
                          required={true}
                        />
                      </div>
                      <InputField
                        label="PROJECT DESCRIPTION"
                        name="projectDescription"
                        handleChange={handleInputChange}
                        error={errors.projectDescription}
                        gap={"mb-2"}
                        required={true}
                      />
                      <InputField
                        label="ORGANISATION DESCRIPTION"
                        name="organistationDescription"
                        handleChange={handleInputChange}
                        error={errors.organistationDescription}
                        required={false}
                        gap={"mb-2"}
                      />
                      <InputField
                        label="DEPLOYMENT LINK"
                        name="deploymentLink"
                        handleChange={handleInputChange}
                        error={errors.deploymentLink}
                        required={false}
                        gap={"mb-2"}
                      />
                      <InputField
                        label="EXPECTED NUMBER OF MENTORS"
                        name="expectedMentors"
                        handleChange={handleInputChange}
                        error={errors.expectedMentors}
                        required={true}
                        type="number"
                        gap={"mb-2"}
                      />
                      <InputField
                        label="REFERRAL CODE (If none, enter N/A)"
                        name="referral"
                        handleChange={router?.query?.referral ?()=>{} :handleInputChange}
                        error={errors.referral}
                        required={false}
                        gap={"mb-2"}
                        value={formData.referral || ""}
                        readonly={router?.query?.referral ? true : false}
                      />
                      <SelectField
                        label="DO YOU HAVE A STARTUP AND ARE SEEKING SERVICES? SELECT 'YES' TO RECEIVE FUTURE BULDER.AI UPDATES (OPTIONAL)"
                        name="startupServices"
                        options={["", "YES", "NO"]}
                        handleChange={handleInputChange}
                        error={errors.startupServices}
                        required={false}
                      />
                      {formData.gender && formData.gender === "Female" && (
                        <div className="mb-4">
                          <div className="block text-sm font-semibold text-gray-800 mb-4">
                            IF YOU WISH TO HAVE YOUR RESUME SHARED WITH
                            COMPANIES, PLEASE UPLOAD YOUR RESUME (OPTIONAL)
                          </div>
                          <UploadField
                            name="resume"
                            label="Upload Resume"
                            onChange={handleFileChange}
                            preview={false}
                            setuploadedFile={setuploadedFile}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {role === "Mentor" && (
                    <>
                      <TextAreaField
                        label="BRIEFLY, EXPLAIN YOUR TECH-STACK, AND YOUR EXPERTISE."
                        name="techStacks"
                        handleChange={handleInputChange}
                        error={errors.techStacks}
                      />
                      <InputField
                        label="WHY DO YOU WISH TO BECOME A GSSOC MENTOR?"
                        name="reason"
                        handleChange={handleInputChange}
                        error={errors.reason}
                      />
                      <InputField
                        label="REFERRAL CODE (If none, enter N/A)"
                        name="referral"
                        handleChange={router?.query?.referral ?()=>{} :handleInputChange}
                        error={errors.referral}
                        required={false}
                        value={formData.referral || ""}
                        readonly={router?.query?.referral ? true : false}
                      />
                      <SelectField
                        label="DO YOU HAVE A STARTUP AND ARE SEEKING SERVICES? SELECT 'YES' TO RECEIVE FUTURE BULDER.AI UPDATES (OPTIONAL)"
                        name="startupServices"
                        options={["", "YES", "NO"]}
                        handleChange={handleInputChange}
                        error={errors.startupServices}
                        required={false}
                      />
                      {formData.gender && formData.gender === "Female" && (
                        <div className="mb-4">
                          <div className="block text-sm font-semibold text-gray-800 mb-4">
                            IF YOU WISH TO HAVE YOUR RESUME SHARED WITH
                            COMPANIES, PLEASE UPLOAD YOUR RESUME (OPTIONAL)
                          </div>
                          <UploadField
                            name="resume"
                            label="Upload Resume"
                            onChange={handleFileChange}
                            preview={false}
                            setuploadedFile={setuploadedFile}
                          />
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-end">
                    <button
                      className="border-[#f57d33] border-2 font-bold text-[#f57d33] py-2 px-4 rounded-lg shadow hover:bg-[#F26611] hover:text-white w-full md:w-40"
                      onClick={handleBack}
                    >
                      Back
                    </button>

                    <button
                      onClick={handleSubmit}
                      className={`bg-[#f57d33] text-white py-2 px-4 rounded-lg shadow hover:bg-[#F26611] w-full md:w-40 ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };
  return (
    <>
      <Head>
        <title>
          Register | GirlScript Summer of Code 2024 | GirlScript Foundation
          India
        </title>
        <meta
          name="description"
          content="Register of GirlScript Summer of Code"
        />
      </Head>
      <div className="min-h-screen p-10 bg-gray-100 relative flex flex-col gap-10 items-center justify-center">
        {renderForm()}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center relative border-2 border-black border-dotted">
              <div className="h-40 overflow-hidden flex items-center justify-center">
                <img
                  src="https://github.com/user-attachments/assets/c5a4d3b9-a507-499f-8909-e6b69abd9b8a"
                  alt="Banner"
                  width={400}
                />
              </div>

              <h2 className="text-2xl font-semibold mb-4">
                Submission Successful !!
              </h2>
              <p className="text-lg mb-12 max-w-xl w-full">
                Get ready to embark on a exciting open source journey with
                GSSoC&apos;24 Extended Program. Our team will review your
                submission and get back to you soon.
              </p>

              <button
                onClick={handleClosePopup}
                className=" bg-[#F96727] hover:bg-[#e36b38] text-white py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  handleChange = () => {},
  error,
  value,
  required = true,
  readonly = false,
  gap = "mb-6",
}) => (
  <div className={`${gap} w-full`}>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-800 mb-2"
    >
      {label}{" "}
      <span className="text-xs text-red-500">{`${
        required ? "(required)" : ""
      }`}</span>
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      readOnly={readonly}
      className={`block w-full py-2 px-3 border border-black dark:bg-white rounded-md shadow-sm focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-[#ff7e34] transition-all ${
        error
          ? "border-red-500 focus:border-red-500"
          : "focus:border-indigo-500"
      }`}
      onChange={handleChange}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      required={required}
    />
    {error && (
      <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
        {error}
      </p>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  error: PropTypes.string,
};

const SelectField = ({
  label,
  name,
  options,
  handleChange = () => {},
  error,
  value,
  required = true,
}) => (
  <div className="mb-6 w-full">
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-800 mb-2"
    >
      {label}{" "}
      <span className="text-xs text-red-500">{`${
        required ? "(required)" : ""
      }`}</span>
    </label>
    <select
      id={name}
      name={name}
      value={value}
      className={`block w-full py-2 px-3 border dark:bg-white border-black rounded-md shadow-sm focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-[#ff7e34] transition-all ${
        error
          ? "border-red-500 focus:border-red-500"
          : "focus:border-indigo-500"
      }`}
      onChange={handleChange}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      required={required}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && (
      <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
        {error}
      </p>
    )}
  </div>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func,
  error: PropTypes.string,
};

const TextAreaField = ({
  label,
  name,
  placeholder = "",
  handleChange = () => {},
  error,
  required = true,
}) => (
  <div className="mb-6">
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-800 mb-2"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      className={`block w-full py-2 min-h-24 px-3 dark:bg-white border border-black rounded-lg shadow-sm focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-[#ff7e34] transition-all ${
        error
          ? "border-red-500 focus:border-red-500"
          : "focus:border-indigo-500"
      }`}
      onChange={handleChange}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      required={required}
    ></textarea>
    {error && (
      <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
        {error}
      </p>
    )}
  </div>
);

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  error: PropTypes.string,
};

export default Registration;
