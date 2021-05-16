import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import MetaTag from '../../components/MetaTag';
import { MetaData } from '../../types/MetaData';
import { Experience as ExperienceType } from '../../types/Experience';
import exps from '../../mock/experience';
import { format, isSameDay } from 'date-fns';

const Experience = () => {
	const metaData: MetaData = {
		title: 'Amien Amry | Experience',
		description: 'My experience',
		image_url: 'https://www.amienamry.dev/images/logo/experience.jpg',
		path: 'https://www.amienamry.dev/experience',
	};

	return (
		<div className='pb-20'>
			<MetaTag {...metaData} />

			<main className='flex flex-1 justify-center'>
				<Content />
			</main>
		</div>
	);
};

const Content = () => {
	return (
		<div className='flex flex-1 max-w-screen-xl mt-20 p-5 flex-col md:flex-row bg-black bg-opacity-40 rounded-md'>
			<VerticalTimeline>
				{exps.map((exp: ExperienceType, i: number) => {
					const isLastItem = exps.length - 1 === i;
					const date = isLastItem
						? format(exp?.year_from, 'MMM yyyy')
						: `${format(exp?.year_from, 'MMM yyyy')} - ${
								isSameDay(exp?.year_to, new Date()) ? 'present' : format(exp?.year_to, 'MMM yyyy')
						  }`;

					return (
						<VerticalTimelineElement
							key={exp?.title + i.toString()}
							contentStyle={{ background: exp.background_color, color: '#fff' }}
							contentArrowStyle={{ borderRight: `7px solid ${exp.background_color}` }}
							date={date}
							iconStyle={{ background: exp.background_color, color: '#fff' }}
							icon={<exp.icon />}>
							<h3 className='text-2xl font-semibold'>{exp?.title}</h3>
							{!isLastItem && <h4 className='text-xl'>{exp?.company}</h4>}

							{!isLastItem && (
								<ul className='list-disc pl-5'>
									{exp?.points.map((point, i) => {
										return (
											<li key={point + i.toString()} className='text-xl text-white my-3'>
												{point}
											</li>
										);
									})}
								</ul>
							)}
						</VerticalTimelineElement>
					);
				})}
			</VerticalTimeline>
		</div>
	);
};

export default Experience;
