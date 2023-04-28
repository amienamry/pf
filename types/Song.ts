export type Song = {
	key: string;
	title: string;
	fullTitle: string;
	artist: string;
	description: string;
	imgThumb: string;
	imgBg: string;
	audioUrl: string;
	platforms: StreamingPlatform[];
};

export type StreamingPlatform = {
	name: string;
	url: string;
	imgUrl: string;
};
