import React, { useRef, useEffect } from 'react';

const BackgroundVideo = (props: { videoError: () => void }) => {
	const videoRef = useRef(null);

	useEffect(() => {
		const videoReplayInterval = setInterval(() => {
			if (videoRef.current?.paused || videoRef.current?.ended) {
				videoRef.current.muted = true;
				videoRef.current.play().catch((err) => console.log(err));
			}
		}, 1000);

		return () => clearInterval(videoReplayInterval);
	}, []);

	return (
		<video
			onError={props.videoError}
			ref={videoRef}
			muted
			autoPlay
			loop
			playsInline
			style={{
				objectFit: 'cover',
				width: '100%',
				height: '100%',
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: -1,
			}}
		>
			<source src='/videos/bg-video.mp4' type='video/mp4' />
		</video>
	);
};

export default BackgroundVideo;
