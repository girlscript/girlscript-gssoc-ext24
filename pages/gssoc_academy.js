import { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Text,
    Progress,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { modules as academyModules } from "./api/gssocAcademyData";
import Link from "next/link";
import YouTube from "react-youtube";

// Mock fetching data from json file
const fetchAcademyData = () => {
    return {
        modules: academyModules,
    };
};

const GSSOCAcademy = () => {
    const router = useRouter();
    const { moduleName, video } = router.query;
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchAcademyData();
            setModules(data.modules);
        }
        fetchData();
    }, []);

    // Re-fetch or update when query params (moduleName, video) changes
    useEffect(() => {
        if (moduleName && modules?.length > 0) {
            const selectedModule = modules.find(
                (mod) => mod.moduleName === moduleName
            );
            setSelectedModule(selectedModule || null);
            console.log("vid: ", video);
            if (selectedModule && video) {
                const selectedVideo = selectedModule.videos.find(
                    (vid) => vid.title === video
                );
                setSelectedVideo(selectedVideo || null);
                console.log("selectedVideo: ", selectedVideo);
            } else {
                setSelectedVideo(null);
            }
        } else {
            setSelectedModule(null);
            setSelectedVideo(null);
        }
    }, [moduleName, video, modules]);

    console.log("name: ", moduleName);
    console.log("video: ", video);
    return (
        <Box p={6}>
            <Heading mb={6}>GSSOC ACADEMY</Heading>

            {/* Breadcrumb Navigation */}
            <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} href="/gssoc_academy">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {moduleName && (
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link}
                            href={`/gssoc_academy?moduleName=${moduleName}`}
                        >
                            {moduleName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}

                {video && (
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} href="#">{video}</BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            </Breadcrumb>

            {/* Display all modules if no specific module is selected */}
            {!moduleName && (
                <Box mt={6}>
                    {modules.map((module) => (
                        <Box
                            key={module.moduleName}
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            mb={4}
                        >
                            <Link
                                href={`/gssoc_academy?moduleName=${module.moduleName}`}
                                passHref
                            >
                                <Heading size="md" cursor="pointer">
                                    {module.moduleName}
                                </Heading>
                            </Link>
                            <Progress
                                value={module.progress}
                                size="sm"
                                mt={2}
                                className="overflow-hidden rounded-full"
                                colorScheme="green"
                                max={100}
                                min={0}
                                // aria-valuenow={module.progress}
                            />
                            <Text mt={2}>{module.progressMessage}</Text>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Display videos for a selected module */}
            {moduleName && !video && (
                <Box mt={6}>
                    <Heading size="lg" mb={6}>
                        Module: {moduleName}
                    </Heading>
                    {selectedModule?.videos?.length > 0 ? (
                        selectedModule.videos.map((video) => (
                            <Box
                                key={video.title}
                                borderWidth="1px"
                                borderRadius="lg"
                                p={4}
                                mb={4}
                            >
                                <Link
                                    href={`/gssoc_academy?moduleName=${encodeURIComponent(
                                        moduleName
                                    )}&video=${encodeURIComponent(
                                        video.title
                                    )}`}
                                    passHref
                                >
                                    <Heading size="md" cursor="pointer">
                                        {video.title}
                                    </Heading>
                                </Link>
                                <Text mt={2}>{video.description}</Text>
                                <Progress
                                    value={video.progress}
                                    size="sm"
                                    mt={2}
                                    className="overflow-hidden rounded-full"
                                    colorScheme="green"
                                    max={100}
                                    min={0}
                                    // aria-valuenow={video.progress}
                                />
                            </Box>
                        ))
                    ) : (
                        <Text>No videos available for this module.</Text>
                    )}
                </Box>
            )}

            {/* Display selected video if video is available */}
            {video && (
                <Box mt={6}>
                    <Heading size="lg" mb={6}>
                        {video}
                    </Heading>
                    <YouTube videoId={selectedVideo?.url.split("/embed/")[1]} />
                    {/*                     <iframe
                        width="100%"
                        height="400px"
                        src={selectedVideo?.url}
                        title={video}
                        frameBorder="0"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe> */}
                </Box>
            )}
        </Box>
    );
};

export default GSSOCAcademy;
