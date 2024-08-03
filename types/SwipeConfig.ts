import { MutableRefObject } from 'react';

export type SwipeConfig<T> = {
	ref?: MutableRefObject<T>;
	onLeftSwipe?: () => void;
	onRightSwipe?: () => void;
	onDownSwipe?: () => void;
	onUpSwipe?: () => void;
};
