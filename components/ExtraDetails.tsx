import { frameworks } from "../mock/frameworks";
import { hobbies } from "../mock/hobbies";
import { interests } from "../mock/interests";
import { languages } from "../mock/languages";
import { skills } from "../mock/skills";
import CollapsibleList from "./CollapsibleList";

const ExtraDetails = () => {
	return (
		<>
			<div className="flex flex-1 flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
				<div className="flex flex-1 flex-col mt-6">
					<h3 className="text-4xl mt-3 mb-5 font-semi-bold text-gray-100">
						Skills
					</h3>
					<CollapsibleList list={skills} type="skills" />
				</div>
				<div className="flex flex-1 flex-col mt-6">
					<h3 className="text-4xl mt-3 mb-5 font-semi-bold text-gray-100">
						Languages
					</h3>
					<CollapsibleList list={languages} type="languages" />
				</div>
			</div>
			<div className="flex flex-1 flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
				<div className="flex flex-1 flex-col mt-6">
					<h3 className="text-4xl mt-3 mb-5 font-semi-bold text-gray-100">
						Frameworks & Tools
					</h3>
					<CollapsibleList
						list={frameworks}
						type="frameworks & tools"
					/>
				</div>
				<div className="flex flex-1 flex-col mt-6">
					<h3 className="text-4xl mt-3 mb-5 font-semi-bold text-gray-100">
						Keen to Explore
					</h3>
					<CollapsibleList list={interests} type="interests" />
				</div>
			</div>
			<div className="flex flex-1 flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
				<div className="flex flex-1 flex-col mt-6">
					<h3 className="text-4xl mt-3 mb-5 font-semi-bold text-gray-100">
						Hobbies
					</h3>
					<CollapsibleList list={hobbies} type="frameworks" />
				</div>
			</div>
		</>
	);
};

export default ExtraDetails;
