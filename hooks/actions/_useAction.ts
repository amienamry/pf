import { addMinutes } from 'date-fns';
import { useState } from 'react';
import { fetchIf, setupApiRequest } from '../../helpers';
import {
	ActionCallback,
	ActionConfig,
	ActionMethod,
	ActionReturn,
	ActionStore,
} from '../../types/data/Action';

// TODO: store in localStorage
const stores = new Map<string, { data: any; lastFetched: Date | null }>();

/**
 * Custom hook to handle API actions with caching.
 *
 * This hook manages the state of data fetched from an API and caches it locally
 * to reduce redundant API calls within 5 minutes period.
 *
 * @template T - The type of the data being managed by the hook.
 * @param {ActionConfig} options - Options for configuring the hook.
 * @returns {object} - An object containing the current data and functions for making API requests.
 */
export const _useAction = <T>({
	path,
	defaultState,
}: ActionConfig<T>): ActionReturn<T> => {
	if (!stores.has(path)) {
		stores.set(path, {
			data: defaultState ?? null,
			lastFetched: null,
		});
	}

	const currentStore = () => {
		return stores.get(path);
	};

	const [data, setData] = useState<T>(currentStore().data);

	const actionGet: ActionMethod<T> = (
		params,
		force = false,
		cb?: ActionCallback<T>
	) => {
		const dataIsFresh =
			currentStore().lastFetched &&
			new Date() < addMinutes(currentStore().lastFetched, 5);

		const request = setupApiRequest(path, params);

		const shouldCallApi = force || !dataIsFresh;

		fetchIf(
			shouldCallApi,
			request,
			(json) => {
				stores.set(path, {
					data: json,
					lastFetched: new Date(),
				} as ActionStore<T>);

				const store = currentStore();

				setData(store.data);

				cb?.(store.data, store.lastFetched);
			},
			() => {
				const store = currentStore();

				cb?.(store.data, store.lastFetched);
			}
		);
	};

	// TODO:
	const actionPost = () => {};

	// TODO:
	const actionPut = () => {};

	// TODO:
	const actionPatch = () => {};

	// TODO:
	const actionDelete = () => {};

	return {
		data,
		actionGet,
		actionPost,
		actionPut,
		actionPatch,
		actionDelete,
	};
};
