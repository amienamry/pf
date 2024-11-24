import { BiSearch } from 'react-icons/bi';
import Card from '../../components/Card';
import MainLayout from '../../components/MainLayout';
import { MetaDataType } from '../../types/MetaData';
import { projects } from '../../mock/projects';

const Projects = () => {
	const metaData: MetaDataType = {
		title: 'Amien Amry | Projects',
		description:
			'Explore my portfolio of projects developed as a full stack developer. Discover various web and mobile applications showcasing my skills and expertise in full stack development.',
		image_url: 'https://amienamry.dev/images/logo/projects.png',
		path: 'https://amienamry.dev/projects',
	};

	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	projects.sort(
		(a, b) =>
			new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf()
	);

	return (
		<div className='relative flex flex-col flex-1 max-w-screen-lg mt-20 bg-black bg-opacity-40 rounded-md'>
			<div className='flex flex-1 px-2.5 sm:px-5 mx-2 sm:mx-0 mt-6 mb-3'>
				<input
					onChange={(e) => {}} // TODO:
					className='w-full bg-neutral-600 h-10 rounded-lg pl-2 pr-8'
					type='text'
					placeholder='Search by project name, type or company name'
				/>
				<BiSearch className='absolute h-6 w-6 right-6 top-8' />
			</div>

			<div className='flex flex-1 flex-col p-2.5 sm:p-5 mx-2 sm:mx-0'>
				{!projects.length ? (
					<div className='min-h-[50vh] flex flex-col items-center w-full text-center text-lg py-12'>
						No results found 😿
					</div>
				) : (
					projects.map((project) => {
						return (
							<Card
								key={
									'project-all-' + project.slug + project.name
								}
								data={{
									id: project.slug,
									href: `projects/${project.slug}`,
									title: `${project.name}${
										project.subCompany
											? ` - ${project.subCompany}`
											: ''
									}`,
									tag: project.type,
									date: new Date(project.startDate),
									description: project.company,
									imgThumb: project.imgThumb,
									imgAltText: `${project.name}'s cover`,
								}}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Projects;
