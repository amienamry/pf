'use client';
import { HTMLAttributeAnchorTarget, HTMLAttributes, useEffect } from 'react';
import { useRouter } from 'next/router';

const SUPER_UNIQUE_ID_LOL = 'pfLinkUrlBottomLeftMakKauHijauDungGudungGudung';

const state: { stack: string[]; element?: HTMLDivElement; timeout: any } = {
	stack: [],
	element: null,
	timeout: null,
};

type PfLinkProps = {
	href: string;
	target?: HTMLAttributeAnchorTarget | undefined;
	isMobile?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const PfLink: React.FC<PfLinkProps> = ({
	href,
	target,
	isMobile,
	...props
}) => {
	const router = useRouter();

	const isCompleteHref = (url: string) => {
		try {
			const urlObj = new URL(url);
			return ['http:', 'https:'].includes(urlObj.protocol);
		} catch (_) {
			return false;
		}
	};

	const handleHoverIn = () => {
		if (isMobile) {
			return;
		}

		clearTimeout(state.timeout);

		let element =
			state.element ??
			(document.getElementById(SUPER_UNIQUE_ID_LOL) as HTMLDivElement);

		if (!element) {
			element = document.createElement('div');
			element.id = SUPER_UNIQUE_ID_LOL;
			element.classList.add('url-hover-tag');
		}

		const fullHref = isCompleteHref(href)
			? href
			: `${location.origin}/${href}`;

		state.timeout = setTimeout(() => {
			element.innerText = fullHref;
		}, 300);

		state.stack.push(fullHref);

		if (!document.getElementById(SUPER_UNIQUE_ID_LOL)) {
			document.body.appendChild(element);
		}

		state.element = element;
	};

	const handleHoverOut = () => {
		if (isMobile) {
			return;
		}

		clearTimeout(state.timeout);

		state.stack.pop();

		if (!state.stack.length && state?.element) {
			clearState();
		} else {
			state.timeout = setTimeout(() => {
				state.element &&
					(state.element.innerText =
						state.stack[state.stack.length - 1]);
			}, 300);
		}
	};

	const openInNewTab = () => {
		isCompleteHref(href)
			? window.open(href, '_blank')
			: window.open(`${location.origin}/${href}`, '_blank');
	};

	const goToNextPage = () => {
		isCompleteHref(href) ? (location.href = href) : router.push(href);
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();

		if (target === '_blank') {
			openInNewTab();
		} else {
			goToNextPage();
			clearState();
		}
	};

	const clearState = () => {
		state.stack.length = 0;
		state.element?.remove();
		state.element = null;
	};

	const handleMouseDown = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		// mouse scroll btn down
		if (e.button === 1) {
			e.preventDefault();
		}
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		// mouse scroll btn up
		if (e.button === 1) {
			openInNewTab();
		}
	};

	useEffect(() => {
		return () => clearState();
	}, []);

	return (
		<div
			{...props}
			className={(props?.className ?? '') + ' cursor-pointer'}
			onMouseEnter={() => handleHoverIn()}
			onMouseLeave={() => handleHoverOut()}
			onMouseUp={(e) => handleMouseUp(e)}
			onMouseDown={(e) => handleMouseDown(e)}
			onClick={(e) => handleClick(e)}
		/>
	);
};

export default PfLink;
