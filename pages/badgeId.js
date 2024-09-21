import {
  Spacer,
  Input,
  Box,
  FormLabel,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import dynamic from "next/dynamic";

const BadgeID_Comp = dynamic(() => import("../components/BadgeID_Comp"), {
  ssr: false,
});

const Badge = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Github, setGithub] = useState("");
  const [Role, setRole] = useState("Contributor");
  const [image, setImage] = useState(null);
  const [verified, setVerified] = useState(false);
  const inputFileRef = useRef(null);
  // const [year, setYear] = useState("2024-Extd");

  const setVerifiedTrue = () => {
    setVerified(true);
    console.log("verified");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const fileTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file) {
      if (!fileTypes.includes(file.type)) {
        alert("Please upload a valid image file (png, jpg, jpeg).");
        return;
      }

      if (file.size > maxSize) {
        alert("File size exceeds 5MB. Please upload a file less than 5MB.");
        return;
      }

      setImage(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <>
      <Head>
        <title>
          Get your badge | GirlScript Summer of Code 2024 | GirlScript
          Foundation India
        </title>
        <meta name="description" content="GirlScript Summer of Code BadgeID" />
      </Head>
      <div className="items-center justify-center">
        <div className="mt-5 font-sans text-center text-2xl font-extrabold text-black-100">
          <div className="text-primary_orange-0 dark:text-white font-sans text-3xl md:text-5xl text center font-extrabold flex wrap justify-center flex-col md:flex-row mb-10 underline decoration-orange-500  underline-offset-8">
            <h1>Get your&nbsp;</h1>
            <h1 className="text-primary_orange-0">Badge</h1>
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
          className="text-primary_orange-0 px-2 dark:text-white dark:border-slate-200 border-black border-2 rounded-md font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          onChange={(e) => setEmail(e.target.value)}
          disabled={verified}
        ></input>
        <label className="text-black dark:text-primary_orange-0 font-semibold mt-3 text-lg">
          Enter Fullname*
        </label>
        <input
          type="text"
          className="text-primary_orange-0 px-2 dark:text-white dark:border-slate-200 border-black border-2 rounded-md font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          onChange={(e) => setName(e.target.value)}
          disabled={verified}
        ></input>
        <label className="text-black dark:text-primary_orange-0 font-semibold mt-3 text-lg">
          {`Select Role in GSSoC 2024-Extd`}
        </label>
        <select
          className="text-primary_orange-0 px-1 dark:text-white dark:border-slate-200 border-black border-2 rounded-md  font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          defaultValue="Contributor"
          onChange={(e) => setRole(e.target.value)}
          disabled={verified}
        >
          <option value="Contributor">Contributor</option>
          <option value="Mentor">Mentor</option>
          <option value="Project Admin">Project Admin</option>
          <option value="Campus Ambassador">Campus Ambassador</option>
        </select>
        <label className="text-black dark:text-primary_orange-0 font-semibold mt-3 text-lg">
          {Role === "Campus Ambassador"
            ? "Enter Github username (Leave blank if N/A)"
            : "Enter Github username*"}
        </label>
        <input
          type="text"
          className="text-primary_orange-0 px-2 dark:text-white dark:border-slate-200 border-black border-2 rounded-md font-semibold mt-2 text-xs sm:text-sm md:text-lg"
          value={Github}
          onChange={(e) => setGithub(e.target.value)}
          disabled={verified}
        ></input>

        <Box mt={4}>
          <FormLabel className="text-black dark:text-primary_orange-0 font-semibold mt-4">
            Upload Your Image (PNG, JPG, JPEG) Max-size: 5MB
          </FormLabel>
          <Button
            leftIcon={<Icon as={AiOutlineCloudUpload} />}
            colorScheme="orange"
            variant="outline"
            onClick={handleUploadClick}
          >
            {image ? "Uploaded" : "Click to Upload"}
          </Button>
          <Input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={inputFileRef}
            onChange={handleImageUpload}
            display="none"
          />
          {image && (
            <Box mt={4}>
              <Text fontSize="sm" color="gray.500">
                Preview:
              </Text>
              <img
                src={image}
                alt="Uploaded Preview"
                style={{
                  maxWidth: "200px",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
        </Box>
        <Spacer mt={20} />
        <BadgeID_Comp
          Name={Name}
          Role={Role}
          Github={Github}
          Email={Email}
          image={image}
          verified={verified}
          setVerified={setVerifiedTrue}
        />
      </div>
    </>
  );
};

export default Badge;
