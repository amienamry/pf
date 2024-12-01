import useEmblaCarousel from 'embla-carousel-react';
import MainLayout from '../../components/MainLayout';
import { projects } from '../../mock/projects';
import { MetaDataType } from '../../types/MetaData';
import { useRouter } from 'next/router';
import redirect from 'nextjs-redirect';
import { ProjectData, ProjectTool } from '../../types/data/ProjectData';
import Image from 'next/image';
import PfLink from '../../components/PfLink';
import { isMobile } from '../../helpers';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import dynamic from 'next/dynamic';

const ImageViewer = dynamic(() => import('react-viewer'), { ssr: false });

const Project = ({ isMobile }) => {
	const router = useRouter();

	const project = projects.find(
		(project) => project.slug === router.query.slug
	);

	if (!router.isReady) return 'Loading...';

	if (!project) {
		const Redirect = redirect(
			`${process.env.NEXT_PUBLIC_WEB_URL}/projects`
		);
		return <Redirect>Not found</Redirect>;
	}

	const defaultText = 'Amien Amry | Project';

	const makeTitle = (): string => {
		let result = project.name;

		if (project.subCompany) {
			result = `${result} at ${project.subCompany}`;
		}

		result = `${result} ${project.subCompany ? 'and' : 'at'} ${
			project.company
		}`;

		if (result.length < 40) {
			result = `${result} - ${defaultText}`;
		}

		return result;
	};

	const metaData: MetaDataType = {
		title: makeTitle(),
		description: project.summary
			? project.summary
			: 'Explore my portfolio of projects developed as a full stack developer. Discover various web and mobile applications showcasing my skills and expertise in full stack development.',
		image_url: `https://amienamry.dev${project.imgThumb}`,
		path: `https://amienamry.dev/projects/${project.slug}`,
	};

	return (
		<MainLayout
			metaData={metaData}
			Content={() => <Content project={project} isMobile={isMobile} />}
		/>
	);
};

const Content = ({ project }: { project: ProjectData; isMobile?: boolean }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay({ stopOnMouseEnter: true, delay: 2500 }),
	]);

	useEffect(() => {
		const autoplay = emblaApi?.plugins()?.autoplay;

		if (!autoplay) return;

		const interval = setInterval(() => {
			if (!autoplay.isPlaying()) {
				autoplay.play();
			}
		}, 2500);

		return () => clearInterval(interval);
	}, [emblaApi]);

	const tools = project.secondaryStacks
		? project.primaryStacks.concat(project.secondaryStacks)
		: project.primaryStacks;

	return (
		<article className='relative flex flex-col flex-1 max-w-screen-xl mt-20 rounded-md'>
			<div className='relative flex flex-col lg:flex-row w-full sm:pt-8 mb-2'>
				{!!project.images?.length && (
					<div
						className='embla w-full lg:max-w-xl relative'
						ref={emblaRef}
					>
						<ImagesCarousel project={project} />

						<label className='absolute top-1.5 left-1.5 z-[1] text-sm bg-black py-0.5 px-1.5 rounded bg-opacity-40'>
							{project.type}
						</label>
					</div>
				)}

				<div className='flex flex-col w-full sm:w-5/8 px-3 py-1 overflow-hidden'>
					<h1 className='text-2xl font-bold mb-1 mt-2 lg:mt-0'>
						{project.name}
						{project.subCompany ? ` - ${project.subCompany}` : ''}
					</h1>
					<h3 className='text-xl mb-4'>{project.company}</h3>

					<TechStack tools={tools} />

					<p className='text-lg'>{project.summary}</p>
				</div>
			</div>

			<div className='px-3 lg:px-2 py-3 lg:py-2'>
				{project.paragraphs?.map((paragraph, i) => {
					return (
						<p key={`paragraph${i}`} className='text-lg mb-6'>
							{paragraph}
						</p>
					);
				})}
			</div>

			<div className='px-3 lg:px-2 py-2'>
				<TechStackString tools={tools} />
			</div>
		</article>
	);
};

const TechStack = ({ tools }: { tools: ProjectTool[] }) => {
	const [emblaRef] = useEmblaCarousel({ dragFree: true });

	return (
		<>
			<div className='flex lg:hidden flex-row flex-wrap gap-y-2 mb-5'>
				<MappedTools tools={tools} />
			</div>
			<div className='embla w-full mb-5 hidden lg:block' ref={emblaRef}>
				<div className='embla__container'>
					<MappedTools tools={tools} />
				</div>
			</div>
		</>
	);
};

const MappedTools = ({ tools }: { tools: ProjectTool[] }) => {
	return tools.map((tool, index) => {
		return (
			<PfLink
				href={tool.url}
				target='_blank'
				rel='noopener noreferrer'
				className='relative flex mr-1.5 hover:opacity-90 bg-slate-100 rounded h-8 sm:h-10 w-8 sm:w-10 min-w-[2rem] sm:min-w-[2.5rem]'
				onClick={(e) => {
					e.preventDefault();
					window.open(tool.url, '_blank');
				}}
				key={'tool-icon-' + tool.name + index}
				title={tool.name}
				isMobile={false}
			>
				<Image
					className='rounded-sm sm:rounded'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					fill
					alt={`${tool.imgUrl}'s logo`}
					src={tool.imgUrl}
				/>
			</PfLink>
		);
	});
};

const ImagesCarousel = ({ project }: { project: ProjectData }) => {
	const [visible, setVisible] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<>
			<div className='embla__container'>
				{project.images.map((image, i) => {
					const from =
						i % 2 === 0 ? 'from-gray-900' : 'from-slate-600';
					const to = i % 2 === 0 ? 'to-slate-600' : 'to-gray-900';

					const bgGradientClassName = `bg-gradient-to-r ${from} ${to}`;
					return (
						<div
							key={`${image.altText}-${i}`}
							className={`embla__slide relative h-80 w-full  rounded-sm ${bgGradientClassName}`}
						>
							<Image
								className='absolute object-contain'
								alt={image.altText}
								src={image.url}
								fill={true}
								priority={true}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								onClick={() => {
									setVisible(true);
									setActiveIndex(i);
								}}
							/>
						</div>
					);
				})}
			</div>
			<ImageViewer
				activeIndex={activeIndex}
				visible={visible}
				onClose={() => {
					setVisible(false);
				}}
				scalable={false}
				rotatable={false}
				zoomable={false}
				attribute={false}
				drag={false}
				images={project.images.map((img) => ({
					src: img.url,
					alt: img.altText,
				}))}
				onMaskClick={() => setVisible(false)}
				zoomSpeed={0.35}
				minScale={0.5}
				maxScale={5}
			/>
		</>
	);
};

const TechStackString = ({ tools }: { tools: ProjectTool[] }) => {
	const last = tools.pop().name;
	const result = `${tools.map(({ name }) => name).join(', ')} and ${last}`;

	return (
		<label className='text-base mb-3 text-gray-400'>
			Tech stack: {result}.
		</label>
	);
};

export const getServerSideProps = (ctx?: GetServerSidePropsContext) => {
	return {
		props: {
			isMobile: isMobile(ctx),
		},
	};
};

export default Project;
