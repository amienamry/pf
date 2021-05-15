const BackgroundVideo = (props: { videoError: () => void }) => {
	return (
		<video
			onError={props.videoError}
			autoPlay
			muted
			loop
			style={{
				objectFit: 'cover',
				width: '100%',
				height: '100%',
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: -1,
			}}>
			<source src='/videos/bg-video.mp4' type='video/mp4' />
		</video>
	);
};

export default BackgroundVideo;
