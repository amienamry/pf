import 'react-vertical-timeline-component/style.min.css';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { TimelineType } from '../types/Timeline';
import { format, intervalToDuration, isSameDay } from 'date-fns';
import { useIconMapper } from '../hooks/useIconMapper';
import { ExperienceData } from '../types/data/ExperienceData';
import PfSkeleton from './PfSkeleton';

const Timeline = (props: TimelineType) => {
	const getIcon = (data: ExperienceData) => {
		if (data.icon) {
			const Icon = useIconMapper(data.icon);
			return <Icon />;
		}

		if (data.icon_url)
			return <img className='rounded-full' src={data.icon_url} />;

		return null;
	};

	if (!props.data.length) {
		return <PfSkeleton height={500} />;
	}

	return (
		// @ts-ignore
		<VerticalTimeline animate={props.isAnimated ?? false}>
			{props.data.map((data, i: number) => {
				const isLastItem = props.data.length - 1 === i;

				const yearFrom = new Date(data?.year_from);
				const yearTo = data?.year_to
					? new Date(data?.year_to)
					: new Date();

				const date = isLastItem
					? format(yearFrom, 'MMM yyyy')
					: `${format(yearFrom, 'MMM yyyy')} - ${
							isSameDay(yearTo, new Date())
								? 'Present'
								: format(yearTo, 'MMM yyyy')
					  }`;

				const { years, months } = !isLastItem
					? intervalToDuration({
							start: yearFrom,
							end: yearTo,
					  })
					: { years: 0, months: 0 };

				const duration = `${
					years ? `${years}yr${years > 1 ? 's' : ''} ` : ''
				}${months ? `${months}mo${months > 1 ? 's' : ''}` : ''}`;

				return (
					// @ts-ignore
					<VerticalTimelineElement
						key={data?.title + i.toString()}
						contentStyle={{
							background: data.background_color,
							color: '#fff',
						}}
						contentArrowStyle={{
							borderRight: `7px solid ${data.background_color}`,
						}}
						iconStyle={{
							background: data.background_color,
							color: '#fff',
						}}
						icon={getIcon(data)}
					>
						<span className='text-sm text-gray-100'>
							{date}{' '}
							{!!duration && data?.showYearDiff && (
								<span>· {duration}</span>
							)}
						</span>

						<h3 className='text-xl sm:text-2xl font-semibold'>
							{data?.title}
						</h3>

						{!isLastItem && !!data.link && (
							<a
								className='text-lg sm:text-xl underline'
								href={data.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								{data.company}
							</a>
						)}
						{!isLastItem && !data.link && (
							<h4 className='text-lg sm:text-xl'>
								{data?.company}
							</h4>
						)}

						{!isLastItem && (
							<ul className='list-disc pl-5'>
								{data?.points.map((point, i) => {
									return (
										<li
											key={point + i.toString()}
											className='text-lg sm:text-xl text-white my-3'
										>
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
	);
};

export default Timeline;
