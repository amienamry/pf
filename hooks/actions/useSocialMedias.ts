import { SocialMediaData } from '../../types/data/SocialMediaData';
import { _useAction } from './_useAction';

type ReturnType = {
	data: SocialMediaData[];
	getData: (params?: { [key: string]: string }, force?: boolean) => void;
};

export const useSocialMedias = (): ReturnType => {
	const { data, actionGet } = _useAction<ReturnType['data']>({
		path: '/social-medias',
		defaultState: [],
	});

	const getData: ReturnType['getData'] = (params, force = false) => {
		actionGet(params, force);
	};

	return { data, getData };
};
