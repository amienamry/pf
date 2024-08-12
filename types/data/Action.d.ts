export type ActionStore<T> = { data: T; lastFetched: Date | null };

export type ActionConfig<T> = {
	path: string;
	defaultState?: T;
};

export type ActionReturn<T> = {
	data: T;
	actionGet: ActionMethod<T>;
	actionPost: ActionMethod<T>;
	actionPut: ActionMethod<T>;
	actionPatch: ActionMethod<T>;
	actionDelete: ActionMethod<T>;
};

export type ActionCallback<T> = (data: T, lastFetched: Date) => void;

export type ActionMethod<T> = (
	params?: { [key: string]: string },
	force?: boolean,
	cb?: ActionCallback<T>
) => void;
