import { MetaDataType } from './types/MetaData';

export const defaultMetaData: MetaDataType = {
	title: process.env.NEXT_PUBLIC_METADATA_TITLE,
	description: process.env.NEXT_PUBLIC_METADATA_DESCRIPTION,
	image_url: `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_METADATA_IMAGE_PATH}`,
	path: process.env.NEXT_PUBLIC_WEB_URL,
};
