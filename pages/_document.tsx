import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel='preload' href='/images/loader.svg' as='image' />
					<link rel='preload' href='/images/blink.svg' as='image' />
					<link
						rel='preload'
						href='/images/blinking-ellipsis.svg'
						as='image'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
