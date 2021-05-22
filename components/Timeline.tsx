
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { TimelineType } from '../types/Timeline';
import { format, isSameDay } from 'date-fns';

const Timeline = (props: TimelineType) => {
    return (
        <VerticalTimeline animate={props.isAnimated}>
				{props.data.map((data, i: number) => {
					const isLastItem = props.data.length - 1 === i;
					const date = isLastItem
						? format(data?.year_from, 'MMM yyyy')
						: `${format(data?.year_from, 'MMM yyyy')} - ${
								isSameDay(data?.year_to, new Date()) ? 'present' : format(data?.year_to, 'MMM yyyy')
						  }`;

					return (
						<VerticalTimelineElement
							key={data?.title + i.toString()}
							contentStyle={{ background: data.background_color, color: '#fff' }}
							contentArrowStyle={{ borderRight: `7px solid ${data.background_color}` }}
							date={date}
							iconStyle={{ background: data.background_color, color: '#fff' }}
							icon={<data.icon />}>
							<h3 className='text-2xl font-semibold'>{data?.title}</h3>
							{!isLastItem && <h4 className='text-xl'>{data?.company}</h4>}

							{!isLastItem && (
								<ul className='list-disc pl-5'>
									{data?.points.map((point, i) => {
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
    )
}

export default Timeline;