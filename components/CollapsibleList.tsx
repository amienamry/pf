"use client";
import { useEffect, useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { Collapsible } from "../mock/collapsible";

const CollapsibleList = ({ list, type }: Collapsible) => {
	const [showAll, setShowAll] = useState(false);
	const [styles, setStyles] = useState({});
	const filtered = showAll ? list : list.slice(0, 3);

	useEffect(() => {
		setStyles({
			maxHeight: showAll ? "60rem" : "8.2rem",
			overflow: "hidden",
			transition: showAll ? "max-height 0.5s ease-out" : "",
		});

		return () => setStyles({});
	}, [showAll]);

	return (
		<div style={styles}>
			<ul>
				{filtered.map((item, i) => {
					return (
						<li
							key={item.name + i}
							className='flex items-center text-xl mb-1'
						>
							<item.icon className='mr-3 text-lg text-slate-200' />{" "}
							{item.name}
						</li>
					);
				})}
			</ul>
			{list.length > 3 && (
				<div className='mt-2'>
					<span
						onClick={() => setShowAll(!showAll)}
						className='select-none hover:bg-slate-800 py-1 pl-1.5 rounded font-semibold flex flex-row items-center cursor-pointer w-fit'
					>
						Show {showAll ? "less" : "all"}{" "}
						{!showAll && list.length} {!showAll && type}{" "}
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
