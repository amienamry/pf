export type ProjectData = {
	id: string;
	slug: string;
	name: string;
	company: string;
	subCompany?: string;
	startDate: string;
	type: string;
	imgThumb: string;
	primaryStacks: ProjectTool[];
	secondaryStacks?: ProjectTool[];
	paragraphs?: string[];
	images?: ProjectImage[];
};

export type ProjectImage = {
	url: string;
	altText: string;
};

export type ProjectTool = {
	name: string;
	url: string;
	imgUrl: string;
};
