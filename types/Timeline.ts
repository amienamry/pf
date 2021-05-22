import { EducationType } from "./Education";
import { ExperienceType } from "./Experience";

export type TimelineType = {
    data: ExperienceType[] | EducationType[],
    isAnimated?: boolean,
};
