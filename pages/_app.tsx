import { useState } from "react";
import "../styles/global.css";
import { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import Error404 from "../components/Error404";
import BackgroundVideo from "../components/BackgroundVideo";
import CreditFooter from "../components/CreditFooter";
import { Analytics } from "@vercel/analytics/react";

const MyApp = ({ Component, pageProps, router: componentRouter }: AppProps) => {
	const [hasVideoError, setHasVideoError] = useState<boolean>(false);

	const videoError = () => {
		setHasVideoError(true);
	};

	const excludedRoutes = ["/r/[social]", "/streams/[song]"];

	return (
		<div
			className={`${
				hasVideoError ? "bg-gray-900 " : ""
			} relative text-gray-200 font-sans font-normal min-h-screen `}
		>
			{pageProps?.statusCode === 404 && <Error404 />}

			{pageProps?.statusCode !== 404 &&
				!excludedRoutes.includes(componentRouter.route) && (
					<BackgroundVideo videoError={videoError} />
				)}

			{((pageProps?.statusCode !== 404 &&
				!excludedRoutes.includes(componentRouter.route)) ||
				componentRouter.route === "/streams/[song]") && <Navbar />}

			<Component {...pageProps} />

			{pageProps?.statusCode !== 404 &&
				!excludedRoutes.includes(componentRouter.route) &&
				!hasVideoError && <CreditFooter />}

			<Analytics />
		</div>
	);
};

export default MyApp;
