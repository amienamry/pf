import MainLayout from "../../components/MainLayout";
import { MetaDataType } from "../../types/MetaData";

const Projects = () => {
	const metaData: MetaDataType = {
		title: "Amien Amry | Projects",
		description:
			"Explore my portfolio of projects developed as a full stack developer. Discover various web and mobile applications showcasing my skills and expertise in full stack development.",
		image_url: "https://amienamry.dev/images/logo/projects.png",
		path: "https://amienamry.dev/projects",
	};

	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	return (
		<div className="flex flex-1 max-w-screen-lg mt-20 p-2.5 sm:p-5 flex-col bg-black bg-opacity-40 rounded-md">
			<div className="w-full">TODO:</div>
		</div>
	);
};

export default Projects;
