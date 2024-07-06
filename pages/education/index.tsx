import { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import Timeline from "../../components/Timeline";
import { useCurrentEdu } from "../../hooks/useCurrentEdu";
import edus from "../../mock/education";
import { MetaDataType } from "../../types/MetaData";

const Education = ({ asChild }: { asChild?: boolean }) => {
	const isChild = asChild !== undefined && asChild;

	const [isAnimated, setIsAnimated] = useState<boolean>(!isChild);
	const edu = useCurrentEdu();
	const metaData: MetaDataType = {
		title: `Amien Amry | ${edu.title} at ${edu.company}`,
		description: `${edu.year_from.getFullYear()} - ${edu.year_to.getFullYear()} | ${edu.points.join(
			" "
		)}`,
		image_url: "https://amienamry.dev/images/logo/education.png",
		path: "https://amienamry.dev/education",
	};

	useEffect(() => {
		if (isChild) return;

		setTimeout(() => {
			setIsAnimated(false);
		}, 500);

		return;
	}, []);

	if (isChild) {
		return <Timeline data={edus} />;
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
			<Timeline isAnimated={props.isAnimated} data={edus} />
		</div>
	);
};

export default Education;
