import { useState, useEffect } from "react";
import "../styles/main.css";
import "../styles/custom.css";
import { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useRouter } from "next/router";
import * as ga from "../lib/gtag";

import Error404 from "../components/Error404";
import BackgroundVideo from "../components/BackgroundVideo";
import CreditFooter from "../components/CreditFooter";

const MyApp = ({ Component, pageProps, router: componentRouter }: AppProps) => {
	const [hasVideoError, setHasVideoError] = useState<boolean>(false);
	const [isTransparent, setTransparent] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			ga.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	const videoError = () => {
		setHasVideoError(true);
	};

	useScrollPosition(
		({ currPos }) => {
			const isShow: boolean = currPos.y > -35;
			if (isShow !== isTransparent) setTransparent(isShow);
		},
		[isTransparent]
	);

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

			{pageProps?.statusCode !== 404 &&
				!excludedRoutes.includes(componentRouter.route) && (
					<Navbar isTransparent={isTransparent} />
				)}

			<Component {...pageProps} />

			{pageProps?.statusCode !== 404 &&
				!excludedRoutes.includes(componentRouter.route) &&
				!hasVideoError && <CreditFooter />}
		</div>
	);
};

export default MyApp;
