import "react-vertical-timeline-component/style.min.css";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { TimelineType } from "../types/Timeline";
import { format, intervalToDuration, isSameDay } from "date-fns";

const Timeline = (props: TimelineType) => {
	return (
		// @ts-ignore
		<VerticalTimeline animate={props.isAnimated ?? false}>
			{props.data.map((data, i: number) => {
				const isLastItem = props.data.length - 1 === i;

				const date = isLastItem
					? format(data?.year_from, "MMM yyyy")
					: `${format(data?.year_from, "MMM yyyy")} - ${
							isSameDay(data?.year_to, new Date())
								? "Present"
								: format(data?.year_to, "MMM yyyy")
					  }`;

				const { years, months } = !isLastItem
					? intervalToDuration({
							start: data?.year_from,
							end: data?.year_to,
					  })
					: { years: 0, months: 0 };

				const duration = `${
					years ? `${years}yr${years > 1 ? "s" : ""} ` : ""
				}${months ? `${months}mo${months > 1 ? "s" : ""}` : ""}`;

				return (
					// @ts-ignore
					<VerticalTimelineElement
						key={data?.title + i.toString()}
						contentStyle={{
							background: data.background_color,
							color: "#fff",
						}}
						contentArrowStyle={{
							borderRight: `7px solid ${data.background_color}`,
						}}
						iconStyle={{
							background: data.background_color,
							color: "#fff",
						}}
						icon={<data.icon />}
					>
						<span className="text-sm text-gray-100">
							{date}{" "}
							{!!duration && data?.showYearDiff && (
								<span>· {duration}</span>
							)}
						</span>

						<h3 className="text-xl sm:text-2xl font-semibold">
							{data?.title}
						</h3>

						{!isLastItem && !!data.link && (
							<a
								className="text-lg sm:text-xl"
								href={data.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								{data.company}
							</a>
						)}
						{!isLastItem && !data.link && (
							<h4 className="text-lg sm:text-xl">
								{data?.company}
							</h4>
						)}

						{!isLastItem && (
							<ul className="list-disc pl-5">
								{data?.points.map((point, i) => {
									return (
										<li
											key={point + i.toString()}
											className="text-lg sm:text-xl text-white my-3"
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
