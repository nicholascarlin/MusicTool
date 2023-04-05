import React, { useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import ChordFilters from '../filters/ChordFilters';
import EarFilters from '../filters/EarFilters';
import { GiHamburgerMenu } from 'react-icons/gi';
import IntervalsFilters from '../filters/IntervalsFilters';

const SideMenu = ({
	SetActiveSubTask,
	SetChordProgression,
	ChordProgression,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	let iconStyle =
		'absolute right-4 top-4 text-4xl cursor-pointer hover:text-5xl transition-all';

	return (
		<>
			{!isOpen ? (
				<GiHamburgerMenu
					onClick={() => {
						setIsOpen(true);
					}}
					className={iconStyle}
				/>
			) : (
				<AiOutlineClose
					onClick={() => {
						setIsOpen(false);
					}}
					className={iconStyle}
				/>
			)}
			<div
				className={`border-l-2 h-full  marginTop-[105px] right-0 fc-center pt-20 ${
					isOpen ? 'w-[25vw]' : 'w-0'
				} ease-in-out duration-300`}>
				{isOpen ? (
					window.location.pathname === '/intervals' ? (
						<IntervalsFilters
							SetActiveSubTask={SetActiveSubTask}
							isOpen={isOpen}
						/>
					) : window.location.pathname === '/chords' ? (
						<ChordFilters
							SetActiveSubTask={SetActiveSubTask}
							isOpen={isOpen}
							ChordProgression={ChordProgression}
							SetChordProgression={SetChordProgression}
						/>
					) : window.location.pathname === '/ear' ? (
						<EarFilters SetActiveSubTask={SetActiveSubTask} />
					) : null
				) : null}
			</div>
		</>
	);
};

export default SideMenu;
