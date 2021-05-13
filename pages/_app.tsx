import '../styles/main.css';
import { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<div className='text-gray-300 font-sans font-normal bg-green-900 min-h-screen'>
			{pageProps?.statusCode !== 404 && <Navbar />}
			<Component {...pageProps} />
		</div>
	);
};

export default MyApp;
