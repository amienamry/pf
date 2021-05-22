import Head from 'next/head';
import { MetaDataType } from '../types/MetaData';

const MetaTag = (props: MetaDataType) => {
	return (
		<Head>
			<title> {props.title} </title>
			<link rel='shortcut icon' href='/favicon.ico' />
			<meta name='description' content={props.description} />
			<meta name='viewport' content='width=device-width, initial-scale=1' />

			{/* Twitter */}
			<meta property='twitter:card' content='summary_large_image' key='twcard' />
			<meta property='twitter:title' content={props.title} key='twtitle' />
			<meta property='twitter:description' content={props.description} key='twdesc' />
			<meta property='twitter:url' content={props.path} key='twurl' />
			<meta property='twitter:image' content={props.image_url} key='twimage' />
			<meta name='twitter:creator' content='@amienamry' key='twhandle' />
			<meta name='twitter:site' content='@amienamry' key='twsite' />

			{/* Open Graph */}
			<meta property='og:url' content={props.path} key='ogurl' />
			<meta property='og:image' content={props.image_url} key='ogimage' />
			<meta property='og:site_name' content={props.path} key='ogsitename' />
			<meta property='og:title' content={props.title} key='ogtitle' />
			<meta property='og:description' content={props.description} key='ogdesc' />
			<meta property='og:type' content='website' />
		</Head>
	);
};

export default MetaTag;
