import { useState, useEffect } from "react";
import { MetaDataType } from "../../types/MetaData";
import exps from "../../mock/experience";
import Timeline from "../../components/Timeline";
import MainLayout from "../../components/MainLayout";

const Experience = ({ asChild }: { asChild?: boolean }) => {
	const isChild = asChild !== undefined && asChild;

	const [isAnimated, setIsAnimated] = useState<boolean>(!isChild);
	const metaData: MetaDataType = {
		title: "Amien Amry | Professional Experience",
		description:
			"Explore my professional journey and expertise. Learn more about my skills, achievements, and contributions in web and mobile app development.",
		image_url: "https://amienamry.dev/images/logo/experience.png",
		path: "https://amienamry.dev/experience",
	};

	useEffect(() => {
		if (isChild) return;

		setTimeout(() => {
			setIsAnimated(false);
		}, 500);

		return;
	}, []);

	if (isChild) {
		return <Timeline data={exps} />;
	}

	return (
		<MainLayout
			metaData={metaData}
			Content={() => <Content isAnimated={isAnimated} />}
		/>
	);
};

const Content = (props: { isAnimated: boolean }) => {
	return (
		<div className="flex flex-1 max-w-screen-xl mt-20 p-2.5 sm:p-5 flex-col md:flex-row bg-black bg-opacity-40 rounded-md">
			<Timeline isAnimated={props.isAnimated} data={exps} />
		</div>
	);
};

export default Experience;
