import { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import Timeline from '../../components/Timeline';
import { defaultMetaData } from '../../constants';
import { useEducationApi } from '../../hooks/actions/useEducationApi';
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
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/educations/metadata`,
			{
				cache: 'force-cache',
			}
		);

		if (res.status < 200 || res.status >= 300) {
			throw new Error();
		}

		const metaData = (await res.json()) as MetaDataType;

		return {
			props: {
				metaData,
			},
		};
	} catch (err) {
		console.error('Fail to fetch education metadata.');
		return {
			props: {
				metaData: defaultMetaData,
			},
		};
	}
};

export default Education;
