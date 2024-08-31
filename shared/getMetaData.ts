import { defaultMetaData } from '../constants';
import { MetaDataType } from '../types/MetaData';

export const getMetaData = async (path: string): Promise<MetaDataType> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
			cache: 'force-cache',
		});

		if (res.status < 200 || res.status >= 300) {
			throw new Error();
		}

		return (await res.json()) as MetaDataType;
	} catch (err) {
		console.error(`Couldn't fetch ${path}.`);
		return defaultMetaData;
	}
};
