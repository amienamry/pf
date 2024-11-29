import { HTMLAttributeAnchorTarget, HTMLAttributes } from 'react';
import { isMobile } from '../helpers';
import { GetServerSidePropsContext } from 'next';
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

const PfLink: React.FC<PfLinkProps> = (props) => {
	const router = useRouter();

	const isCompleteHref = (url: string) => {
		try {
			const urlObj = new URL(url);
			return ['http:', 'https:'].includes(urlObj.protocol);
		} catch (_) {
			return false;
		}
	};

	const handlerHoverIn = () => {
		if (props.isMobile) {
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

		const href = isCompleteHref(props.href)
			? props.href
			: `${location.origin}/${props.href}`;

		state.timeout = setTimeout(() => {
			element.innerText = href;
		}, 300);

		state.stack.push(href);

		if (!document.getElementById(SUPER_UNIQUE_ID_LOL)) {
			document.body.appendChild(element);
		}

		state.element = element;
	};

	const handlerHoverOut = () => {
		if (props.isMobile) {
			return;
		}

		clearTimeout(state.timeout);

		state.stack.pop();

		if (!state.stack.length && state?.element) {
			state.element.remove();
			state.element = null;
		} else {
			state.timeout = setTimeout(() => {
				state.element.innerText = state.stack[state.stack.length - 1];
			}, 300);
		}
	};

	const openInNewTab = () => {
		isCompleteHref(props.href)
			? window.open(props.href, '_blank')
			: window.open(`${location.origin}/${props.href}`, '_blank');
	};

	const goToNextPage = () => {
		isCompleteHref(props.href)
			? (location.href = props.href)
			: router.push(props.href);
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		props.target === '_blank' ? openInNewTab() : goToNextPage();
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

	return (
		<div
			{...props}
			className={(props?.className ?? '') + ' cursor-pointer'}
			onMouseEnter={() => handlerHoverIn()}
			onMouseLeave={() => handlerHoverOut()}
			onMouseUp={(e) => handleMouseUp(e)}
			onMouseDown={(e) => handleMouseDown(e)}
			onClick={(e) => handleClick(e)}
		/>
	);
};

export const getServerSideProps = (ctx?: GetServerSidePropsContext) => {
	return {
		props: {
			isMobile: isMobile(ctx),
		},
	};
};

export default PfLink;
