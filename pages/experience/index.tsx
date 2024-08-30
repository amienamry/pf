import { useState, useEffect } from 'react';
import { MetaDataType } from '../../types/MetaData';
import Timeline from '../../components/Timeline';
import MainLayout from '../../components/MainLayout';
import { useCurrentRole } from '../../hooks/useCurrentRole';
import { useExperienceApi } from '../../hooks/actions/useExperienceApi';
import { ExperienceData } from '../../types/data/ExperienceData';

const Experience = ({ asChild }: { asChild?: boolean }) => {
	const { data, getData } = useExperienceApi();
	const isChild = asChild !== undefined && asChild;

	const [isAnimated, setIsAnimated] = useState<boolean>(!isChild);

	const exp = useCurrentRole();
	const metaData: MetaDataType = {
		title: `Amien Amry | ${exp.title} at ${exp.company}`,
		description: `${exp.year_from.getFullYear()} - ${exp.year_to.getFullYear()} | ${exp.points.join(
			' '
		)}`,
		image_url: 'https://amienamry.dev/images/logo/experience.png',
		path: 'https://amienamry.dev/experience',
	};

	useEffect(() => {
		getData();

		if (isChild) return;

		setTimeout(() => {
			setIsAnimated(false);
		}, 500);

		return;
	}, []);

	useEffect(() => {
		if (!data.length || isChild) return;

		const timeout = setTimeout(() => {
			setIsAnimated(false);
		}, 500);

		return () => clearTimeout(timeout);
	}, [data]);

	if (isChild) {
		return <Timeline data={data} />;
	}

	return (
		<MainLayout
			metaData={metaData}
			Content={() => <Content data={data} isAnimated={isAnimated} />}
		/>
	);
};

const Content = (props: { data: ExperienceData[]; isAnimated: boolean }) => {
	return (
		<div className='flex flex-1 max-w-screen-xl mt-20 p-2.5 sm:p-5 flex-col md:flex-row bg-black bg-opacity-40 rounded-md'>
			<Timeline isAnimated={props.isAnimated} data={props.data} />
		</div>
	);
};

export default Experience;
