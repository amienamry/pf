import { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import Timeline from '../../components/Timeline';
import { useEducationApi } from '../../hooks/actions/useEducationApi';
import { getMetaData } from '../../shared/getMetaData';
import { EducationData } from '../../types/data/EducationData';
import { MetaDataType } from '../../types/MetaData';
import { OneOf } from '../../types/OneOf';

const Education = ({
	metaData,
	asChild,
}: OneOf<{
	metaData: MetaDataType;
	asChild: boolean;
}>) => {
	const { data, getData } = useEducationApi();
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

const Content = (props: { data: EducationData[]; isAnimated: boolean }) => {
	return (
		<div className='flex flex-1 max-w-screen-xl mt-20 p-2.5 sm:p-5 flex-col md:flex-row bg-black bg-opacity-40 rounded-md'>
			<Timeline isAnimated={props.isAnimated} data={props.data} />
		</div>
	);
};

export const getServerSideProps = async () => {
	return {
		props: {
			metaData: await getMetaData('/educations/metadata'),
		},
	};
};

export default Education;
