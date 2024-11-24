export type ProjectData = {
	id: string;
	slug: string;
	name: string;
	company: string;
	subCompany?: string;
	startDate: string;
	type: string;
	imgThumb: string;
	mainTools: ProjectTool[];
	paragraphs?: string[];
	images?: ProjectImage[];
	tools?: ProjectTool[];
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
