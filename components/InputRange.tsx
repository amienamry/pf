import { ChangeEvent, useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

type InputRangeProps = {
	onChange: (event: ChangeEvent<HTMLInputElement>) => unknown;
	value: number;
	disabled?: boolean;
};

let timer;

export const InputRange = ({ onChange, value, disabled }: InputRangeProps) => {
	const [showVolume, setShowVolume] = useState(false);

	const handleOnChange = (e) => {
		onChange(e);

		!showVolume && setShowVolume(true);

		timer && clearTimeout(timer);

		timer = setTimeout(() => {
			console.log("show volume change to false");
			setShowVolume(false);
		}, 300);
	};

	return (
		<div className="relative w-10 flex justify-center items-center rounded-r-xl">
			{showVolume && (
				<div className="select-none z-10 flex flex-col justify-center items-center">
					<HiOutlineSpeakerWave className="h-5 w-5 mb-0.5" />
					<span className="text-xs">{value.toFixed()}</span>
				</div>
			)}

			<input
				onChange={(e) => handleOnChange(e)}
				className={` ${
					disabled ? "cursor-default" : "cursor-pointer"
				} absolute rounded outline-none rounded-t-none rounded-b-xl`}
				style={{
					transform: "rotate(270deg)",
				}}
				type="range"
				step="1"
				value={value}
				min="0"
				max="100"
				disabled={disabled}
			/>
		</div>
	);
};
