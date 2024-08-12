import { HomeData } from '../../types/data/HomeData';
import { _useAction } from './_useAction';

type ReturnType = {
	data: HomeData | null;
	getData: (params?: { [key: string]: string }, force?: boolean) => void;
};

export const useHome = (): ReturnType => {
	const { data, actionGet } = _useAction<ReturnType['data']>({
		path: '/home',
	});

	const getData: ReturnType['getData'] = (params, force = false) => {
		actionGet(params, force);
	};

	return { data, getData };
};
