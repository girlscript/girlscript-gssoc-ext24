import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { faGitAlt, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const ProjectModal = ({ currProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const btnRef = React.useRef();
  return (
    <div className="w-full absolute bottom-0">
      <button ref={btnRef} onClick={onOpen}
        className=" bg-gradient-to-b from-primary_orange-0 to-orange-600 text-lg text-white dark:text-black font-medium rounded-b-md py-1 hover:bg-gradient-to-t hover:from-primary_orange-0 hover:to-orange-600 w-full"
      >
        Project Details
      </button>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent className="dark:bg-darkmode_gray-0 h-96">
          <ModalHeader className="flex items-center text-primary_orange-0">
            <a
              target="_blank"
              rel="noreferrer"
              href={currProject.project_link || currProject.github || "https://github.com/" + currProject.repo_fullname}>
              {currProject.project_name}
            </a>
            <p className="ml-4 text-base">
              By {currProject.owner_name}
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={15} /> */}
            <div className="flex flex-row justify-between px-6">
              {/* <a
                target="_blank"
                rel="noreferrer"
                href={currProject.project_video_link}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="w-10 h-10 text-youtube-0 dark:text-white"
                    icon={faYoutube}
                  />
                  <p className="ml-2 font-serif font-medium text-base text-justify text-black dark:text-white">
                    Project Video
                  </p>
                </div>
              </a> */}
              <a
                target="_blank"
                rel="noreferrer"
                href={currProject.project_link || currProject.github || "https://github.com/" + currProject.repo_fullname}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="w-10 h-10 text-black dark:text-white "
                    icon={faGitAlt}
                  />
                  <p className="ml-2 font-serif font-medium text-base text-justify text-black dark:text-white">
                    Repository Link
                  </p>
                </div>
              </a>
              {/* <a
                target="_blank"
                rel="noreferrer"
                href={currProject.project_link || currProject.github || "https://github.com/"+currProject.repo_fullname}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="w-10 h-10 text-white "
                    icon={faGitAlt}
                  />
                  <p className="ml-2 font-serif font-medium text-base text-justify text-black dark:text-white">
                    Repository Link
                  </p>
                </div>
              </a> */}
              <div>
                <ModalCloseButton color="orange" />
              </div>
            </div>
            <div className="flex flex-col px-6 mt-5">
              <p className="text-primary_orange-0 font-semibold font-serif text-lg">
                Description
              </p>
              <p className="font-serif text-base dark:text-white">
                {currProject.project_description}
              </p>
            </div>
            {/* <p className="text-primary_orange-0 px-6 mt-5 font-semibold font-serif text-lg">
              Mentors
            </p>
            <div className="flex flex-row flex-wrap px-6 space-x-5 mt-5">
              {currProject.mentors_id.map((mentor, j) => {
                return (
                  <a target="_blank" rel="noreferrer" href={mentor.github} key={j}>
                    <Button
                      key={j}
                      size="sm"
                      colorScheme="black"
                      variant="outline"
                      className="mb-2"
                    >
                      <FontAwesomeIcon
                        className="w-5 h-5 text-black dark:text-white"
                        icon={faGithub}
                        size="2x"
                      />
                      <p className="font-serif text-black font-light dark:text-white">
                        {mentor.name}
                      </p>
                    </Button>
                  </a>
                );
              })}
            </div> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProjectModal;
