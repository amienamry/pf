import { EducationData } from './data/EducationData';
import { ExperienceData } from './data/ExperienceData';

export type TimelineType = {
	data: ExperienceData[] | EducationData[];
	isAnimated?: boolean;
};
