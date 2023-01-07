import { useState, useEffect } from "react";
import { MetaDataType } from "../../types/MetaData";
import exps from "../../mock/experience";
import Timeline from "../../components/Timeline";
import MainLayout from "../../components/MainLayout";

const Experience = () => {
	const [isAnimated, setIsAnimated] = useState<boolean>(true);
	const metaData: MetaDataType = {
		title: "Amien Amry | Experience",
		description: "My experience",
		image_url: "https://amienamry.dev/images/logo/experience.jpg",
		path: "https://amienamry.dev/experience",
	};

	useEffect(() => {
		setTimeout(() => {
			setIsAnimated(false);
		}, 500);

		return;
	}, []);

	return (
		<MainLayout
			metaData={metaData}
			Content={() => <Content isAnimated={isAnimated} />}
		/>
	);
};

const Content = (props: { isAnimated: boolean }) => {
	return (
		<div className='flex flex-1 max-w-screen-xl mt-20 p-2.5 sm:p-5 flex-col md:flex-row bg-black bg-opacity-40 rounded-md'>
			<Timeline isAnimated={props.isAnimated} data={exps} />
		</div>
	);
};

export default Experience;
