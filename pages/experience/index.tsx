import { useState, useEffect } from 'react';
import { MetaDataType } from '../../types/MetaData';
import Timeline from '../../components/Timeline';
import MainLayout from '../../components/MainLayout';
import { useExperienceApi } from '../../hooks/actions/useExperienceApi';
import { ExperienceData } from '../../types/data/ExperienceData';
import { OneOf } from '../../types/OneOf';
import { getMetaData } from '../../helpers';

const Experience = ({
	metaData,
	asChild,
}: OneOf<{
	metaData: MetaDataType;
	asChild: boolean;
}>) => {
	const { data, getData } = useExperienceApi();
	const isChild = asChild !== undefined && asChild;

	const [isAnimated, setIsAnimated] = useState<boolean>(!isChild);

	useEffect(() => getData(), []);

	useEffect(() => {
		let timeoutId;

		if (!data.length || isChild) return;

		timeoutId = setTimeout(() => {
			setIsAnimated(false);
		}, 1000);

		return () => timeoutId && clearTimeout(timeoutId);
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

export const getServerSideProps = async () => {
	return {
		props: {
			metaData: await getMetaData('/experiences/metadata'),
		},
	};
};

export default Experience;
