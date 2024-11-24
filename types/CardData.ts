export type CardData = {
	id: string;
	href: string;
	title: string;
	description: string;
	date: Date;
	tag: string;
	imgThumb: string;
	imgAltText: string;
	verified?: boolean;
	icons?: CardDataIcon[];
};

export type CardDataIcon = {
	name: string;
	url: string;
	imgUrl: string;
};
