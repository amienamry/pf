import Head from 'next/head';
import Image from 'next/image';
import { FaLaptop, FaMobileAlt, FaPhp, FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FiDatabase } from 'react-icons/fi';
import { DiJavascript1 } from 'react-icons/di';
import { GrMysql } from 'react-icons/gr';
import { HiOutlineMail } from 'react-icons/hi';

const App = () => {
	return (
		<div className='pb-10'>
			<Head>
				<title>Amien Amry | Fullstack Developer</title>
				<meta name='description' content="You don't know item" />
				<link rel='icon' href='/favicon.ico' />

				{/* Twitter */}
				<meta name='twitter:card' content="You don't know item" key='twcard' />
				<meta name='twitter:creator' content='amienamry' key='twhandle' />
				<meta name='twitter:url' content='https://amienamry.dev/' key='twurl' />
				<meta name='twitter:image' content='https://www.amienamry.dev/images/logo/logo.jpg' key='twimage' />

				{/* Open Graph */}
				<meta property='og:url' content='https://www.amienamry.dev' key='ogurl' />
				<meta property='og:image' content='https://www.amienamry.dev/images/logo/logo.jpg' key='ogimage' />
				<meta property='og:site_name' content='https://amienamry.dev' key='ogsitename' />
				<meta property='og:title' content='Amien Amry | Fullstack Developer' key='ogtitle' />
				<meta property='og:description' content="You don't know item" key='ogdesc' />
			</Head>

			<main className='flex flex-1 justify-center'>
				<Content />
			</main>
		</div>
	);
};

const Content = () => {
	return (
		<div className='flex flex-1 max-w-screen-xl mt-20 p-5 flex-col md:flex-row bg-black bg-opacity-40 rounded-md'>
			{/* left */}
			<Profile />
			{/* right */}
			<Biography />
		</div>
	);
};

const Profile = () => {
	const age: number = new Date().getFullYear() - 1998;
	const socials: { component: any; url: string; isUrl: boolean }[] = [
		{
			component: HiOutlineMail,
			url: 'mailto:hi@amienamry.com',
			isUrl: false,
		},
		{
			component: FaGithub,
			url: 'https://github.com/amienamry',
			isUrl: true,
		},
		{
			component: FaLinkedinIn,
			url: 'https://linkedin.com/in/amienamry',
			isUrl: true,
		},
		{
			component: FaTwitter,
			url: 'https://twitter.com/amienamry',
			isUrl: true,
		},
		{
			component: FaInstagram,
			url: 'https://instagram.com/amienamry',
			isUrl: true,
		},
	];

	return (
		<div className='flex flex-initial flex-col p-3 md:p-5 justify-center md:justify-start'>
			<div className='flex justify-center'>
				<Image className='rounded-full' src='/images/amien.jpg' alt='amienamry' width={250} height={250} />
			</div>
			<h1 className='text-4xl font-semi-bold text-gray-100 my-1 pt-5 text-center md:text-left'>Amien Amry</h1>
			<p className='text-xl mt-2 text-center md:text-left'>Fullstack Developer</p>
			<p className='text-xl text-center md:text-left'>{age} &#8729; Selangor/KL</p>

			<div className='flex flex-1 items-stretch flex-row mt-8 mb-3'>
				{socials.map((social, i) => {
					return (
						<div key={social.url + i} className='flex flex-1 justify-center mx-1'>
							<a href={social.url} target={social.isUrl ? '_blank' : undefined} rel='noopener noreferrer'>
								<social.component className='text-5xl md:text-4xl lg:text-4xl xl:text-4xl min-w-full hover:opacity-80' />
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const Biography = () => {
	const exp = new Date().getFullYear() - 2019;

	return (
		<div className='flex flex-1 flex-col pb-5 px-3 md:px-5'>
			<h3 className='text-4xl mt-8 md:mt-3 xl:mt-3 lg:mt-3 xl:mt-3 mb-5 font-semi-bold text-gray-100'>
				Biography
			</h3>
			<p className='text-xl mb-3'>
				Fullstack Developer with {exp} years experience in designing and developing user interfaces, data
				structure and debugging within mobile app and web technologies. Proven ability in optimizing those
				functionalities that improve data retrieval and workflow efficiencies.
			</p>
			<p className='text-xl mb-3'>
				Familiar with Laravel, Angular, React-JS/Native, MySQL and Object Oriented/Functional Programming.
				Experience in common third-party APIs and passionate about giving the best design and following coding
				practices.
			</p>

			<Extra />
		</div>
	);
};

const Extra = () => {
	return (
		<div className='flex flex-1 flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row'>
			<div className='flex flex-1 flex-col mt-6'>
				<h3 className='text-4xl mt-3 mb-5 font-semi-bold text-gray-100'>Skills</h3>
				<div>
					<ul>
						<li className='flex items-center text-xl mb-1'>
							<FaLaptop className='mr-3 text-2xl' /> Web Development
						</li>
						<li className='flex items-center text-xl mb-1'>
							<FaMobileAlt className='mr-3 text-2xl' /> Mobile App Development
						</li>
						<li className='flex items-center text-xl mb-1'>
							<FiDatabase className='mr-3 text-2xl' /> Database Management
						</li>
					</ul>
				</div>
			</div>
			<div className='flex flex-1 flex-col mt-6   '>
				<h3 className='text-4xl mt-3 mb-5 font-semi-bold text-gray-100'>Languages</h3>
				<div>
					<ul>
						<li className='flex items-center text-xl mb-1'>
							<FaPhp className='mr-3 text-2xl' /> PHP
						</li>
						<li className='flex items-center text-xl mb-1'>
							<DiJavascript1 className='mr-3 text-2xl' /> Javascript/Typescript
						</li>
						<li className='flex items-center text-xl mb-1'>
							<GrMysql className='mr-3 text-2xl' /> MySQL
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default App;
