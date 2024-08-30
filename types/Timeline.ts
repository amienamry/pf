import { ExperienceData } from './data/ExperienceData';
import { EducationType } from './Education';
import { ExperienceType } from './Experience';

export type TimelineType = {
	data: ExperienceData[] | ExperienceType[] | EducationType[];
	isAnimated?: boolean;
};
