import MainLayout from '../../components/MainLayout';
import { projects } from '../../mock/projects';
import { MetaDataType } from '../../types/MetaData';
import { useRouter } from 'next/router';
import redirect from 'nextjs-redirect';

const LoadingPage = () => (
	<div className='w-screen h-screen bg-black absolute top-0 left-0 z-50 flex justify-center items-center'>
		<img className='w-16 h-16 z-50' src='/images/loader.svg' />
	</div>
);

const Project = () => {
	const router = useRouter();

	if (!router.isReady) return 'Loading...';

	const { slug } = router.query;

	const project = projects.find((project) => project.slug === slug);

	if (!project) {
		const Redirect = redirect(
			`${process.env.NEXT_PUBLIC_WEB_URL}/projects`
		);
		return (
			<Redirect>
				<LoadingPage />
			</Redirect>
		);
	}

	const defaultText = 'Amien Amry | Project';

	const makeTitle = (): string => {
		let result = project.name;

		if (project.subCompany) {
			result = `${result} - ${project.subCompany}`;
		}
		if (project.company) {
			result = `${result} - ${project.company}`;
		}

		if (result.length < 40) {
			result = `${result} - ${defaultText}`;
		}

		return result;
	};

	const metaData: MetaDataType = {
		title: makeTitle(),
		description:
			'Explore my portfolio of projects developed as a full stack developer. Discover various web and mobile applications showcasing my skills and expertise in full stack development.',
		image_url: project.imgThumb,
		path: `https://amienamry.dev/projects/${project.slug}`,
	};

	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	return (
		<div className='relative flex flex-col flex-1 max-w-screen-lg mt-20 bg-black bg-opacity-40 rounded-md'>
			TODO: hehe
		</div>
	);
};
export default Project;
