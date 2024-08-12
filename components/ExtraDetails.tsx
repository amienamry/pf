import { HomeData } from '../types/data/HomeData';
import CollapsibleList from './CollapsibleList';

const ExtraDetails = ({ data }: { data?: HomeData }) => {
	if (!data) return null;

	return (
		<>
			<div className='flex flex-1 flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 2xl:flex-row'>
				<div className='flex flex-1 flex-col mt-6'>
					<h3 className='text-4xl mt-3 mb-5 font-semi-bold text-gray-100'>
						Skills
					</h3>
					<CollapsibleList list={data.skills ?? []} type='skills' />
				</div>
				<div className='flex flex-1 flex-col mt-6'>
					<h3 className='text-4xl mt-3 mb-5 font-semi-bold text-gray-100'>
						Languages
					</h3>
					<CollapsibleList
						list={data.languages ?? []}
						type='languages'
					/>
				</div>
			</div>
			<div className='flex flex-1 flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 2xl:flex-row'>
				<div className='flex flex-1 flex-col mt-6'>
					<h3 className='text-4xl mt-3 mb-5 font-semi-bold text-gray-100'>
						Frameworks & Tools
					</h3>
					<CollapsibleList
						list={data.frameworks ?? []}
						type='frameworks & tools'
					/>
				</div>
				<div className='flex flex-1 flex-col mt-6'>
					<h3 className='text-4xl mt-3 mb-5 font-semi-bold text-gray-100'>
						Keen to Explore
					</h3>
					<CollapsibleList
						list={data.interests ?? []}
						type='interests'
					/>
				</div>
			</div>
			<div className='flex flex-1 flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 2xl:flex-row'>
				<div className='flex flex-1 flex-col mt-6'>
					<h3 className='text-4xl mt-3 mb-5 font-semi-bold text-gray-100'>
						Hobbies
					</h3>
					<CollapsibleList
						list={data.hobbies ?? []}
						type='frameworks'
					/>
				</div>
			</div>
		</>
	);
};

export default ExtraDetails;
