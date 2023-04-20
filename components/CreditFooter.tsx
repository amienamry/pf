import { useRouter } from "next/router";

const CreditFooter = () => {
	const router = useRouter();

	if (router.pathname === "/gallery") {
		return null;
	}

	return (
		<div className="absolute bottom-2 right-2 text-xs">
			Video by{" "}
			<a
				className="font-semibold"
				rel="noopener noreferrer"
				target="_blank"
				href="https://pixabay.com/users/enchantedstudios-722609/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=13495"
			>
				Simon Brough
			</a>{" "}
			from{" "}
			<a
				className="font-semibold"
				rel="noopener noreferrer"
				target="_blank"
				href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=13495"
			>
				Pixabay
			</a>
		</div>
	);
};

export default CreditFooter;
