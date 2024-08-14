import { ExperienceData } from '../../types/data/ExperienceData';
import { _useAction } from './_useAction';

type ReturnType = {
	data: ExperienceData[] | null;
	getData: (params?: { [key: string]: string }, force?: boolean) => void;
};

export const useExperienceApi = (): ReturnType => {
	const { data, actionGet } = _useAction<ReturnType['data']>({
		path: '/experiences',
		defaultState: [],
	});

	const getData: ReturnType['getData'] = (params, force = false) => {
		actionGet(params, force);
	};

	return { data, getData };
};
