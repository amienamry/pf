import { useEffect } from 'react';
import { SwipeConfig } from '../types/SwipeConfig';

/**
 * A custom hook to detect swipe gestures on a given element or the document by default.
 *
 * @param {SwipeConfig<T>} config
 *
 * @example
 * ```tsx
 * import React, { useRef } from 'react';
 * import { useSwipe } from './useSwipe';
 *
 * const MyComponent = () => {
 *   const ref = useRef(null);
 *
 *   useSwipe({
 *     ref,
 *     onRightSwipe: () => console.log('Swiped right'),
 *     onLeftSwipe: () => console.log('Swiped left'),
 *     onUpSwipe: () => console.log('Swiped up'),
 *     onDownSwipe: () => console.log('Swiped down'),
 *   });
 *
 *   return <div ref={ref}>Swipe here</div>;
 * };
 * ```
 */
export const useSwipe = <T>(config: SwipeConfig<T>) => {
	const { ref, ...callbacks } = config;

	let xDown: number | null = null;
	let yDown: number | null = null;

	useEffect(() => {
		// if swiping ref was provided, we use it.
		// else, we listen to the whole document
		const element = ref?.current ?? document;

		if (
			!!element['addEventListener'] &&
			typeof element['addEventListener'] === 'function'
		) {
			element['addEventListener']('touchstart', handleTouchStart, false);
			element['addEventListener']('touchmove', handleTouchMove, false);
		}

		return () => {
			if (
				!!element['removeEventListener'] &&
				typeof element['removeEventListener'] === 'function'
			) {
				element['removeEventListener']('touchstart', handleTouchStart);
				element['removeEventListener']('touchmove', handleTouchMove);
			}
		};
	}, [ref?.current]);

	const handleTouchStart = (event: TouchEvent) => {
		const firstTouch = event.touches[0];
		xDown = firstTouch.clientX;
		yDown = firstTouch.clientY;
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (!xDown || !yDown) {
			return;
		}

		const xUp = event.touches[0].clientX;
		const yUp = event.touches[0].clientY;

		const xDiff = xDown - xUp;
		const yDiff = yDown - yUp;

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) {
				callbacks.onRightSwipe?.();
			} else {
				callbacks.onLeftSwipe?.();
			}
		} else {
			if (yDiff > 0) {
				callbacks.onDownSwipe?.();
			} else {
				callbacks.onUpSwipe?.();
			}
		}

		xDown = null;
		yDown = null;
	};
};
