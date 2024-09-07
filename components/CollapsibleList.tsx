'use client';
import { useEffect, useRef, useState } from 'react';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { CollapsibleType } from '../types/Collapsible';
import PfIcon from './PfIcon';

const CollapsibleList = ({ list, type }: CollapsibleType) => {
	const listRef = useRef<HTMLUListElement | null>(null);
	const [showAll, setShowAll] = useState(false);
	const [styles, setStyles] = useState({});
	const filtered = showAll ? list : list.slice(0, 3);

	useEffect(() => {
		setStyles({
			maxHeight: showAll ? '60rem' : '8.2rem',
			overflow: 'hidden',
			transition: showAll ? 'max-height 0.5s ease-out' : '',
		});

		return () => setStyles({});
	}, [showAll]);

	const scrollToTopList = () => {
		if (!listRef.current) return;

		const listTop =
			listRef.current.getBoundingClientRect().top + window.pageYOffset;

		setTimeout(() => {
			// we have 150 padding for the navbar
			window.scrollTo({
				top: listTop - 150,
				behavior: 'smooth',
			});
		}, 50);
	};

	return (
		<div style={styles}>
			<ul ref={listRef}>
				{filtered.map((item, i) => {
					return (
						<li
							key={item.name + i}
							className='flex items-center text-xl mb-1'
						>
							<span className='mr-3 text-lg text-slate-200'></span>
							<PfIcon
								name={item.icon}
								className='mr-3 text-lg text-slate-200'
							/>
							{item.name}
						</li>
					);
				})}
			</ul>
			{list.length > 3 && (
				<div className='mt-2'>
					<span
						onClick={() => {
							// currently expanded? that means we are collapsing the list. so we need to scroll top
							if (showAll) {
								scrollToTopList();
							}

							setShowAll(!showAll);
						}}
						className='select-none hover:bg-slate-800 py-1 pl-1.5 rounded font-semibold flex flex-row items-center cursor-pointer w-fit'
					>
						Show {showAll ? 'less' : 'all'}{' '}
						{!showAll && list.length} {!showAll && type}{' '}
						{showAll ? (
							<RxCaretUp className='text-2xl' />
						) : (
							<RxCaretDown className='text-2xl' />
						)}
					</span>
				</div>
			)}
		</div>
	);
};

export default CollapsibleList;
