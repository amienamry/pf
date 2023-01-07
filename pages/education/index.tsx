import { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import Timeline from "../../components/Timeline";
import edus from "../../mock/education";
import { MetaDataType } from "../../types/MetaData";

const Education = () => {
	const [isAnimated, setIsAnimated] = useState<boolean>(true);
	const metaData: MetaDataType = {
		title: "Amien Amry | Education",
		description: "My education",
		image_url: "https://amienamry.dev/images/logo/education.jpg",
		path: "https://amienamry.dev/education",
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
			<Timeline isAnimated={props.isAnimated} data={edus} />
		</div>
	);
};

export default Education;
