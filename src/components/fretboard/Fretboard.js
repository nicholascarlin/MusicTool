import FretboardNote from './FretboardNote';
import { FretboardNoteArray } from '../../utils/FretboardNoteArray';
import React from 'react';

const Fretboard = ({ activeNoteIndex }) => {
	// TODO: Fix gray circles placement and Move nut one right
	return (
		<div>
			<div className='grid grid-cols-13 relative'>
				<div className='hidden lg:block w-8 h-8 bg-gray-300 rounded-full absolute left-[calc(14rem)] top-[calc(11rem)]'></div>
				<div className='hidden lg:block w-8 h-8 bg-gray-300 rounded-full absolute left-[calc(22.39rem)] top-[calc(11rem)]'></div>
				<div className='hidden lg:block w-8 h-8 bg-gray-300 rounded-full absolute left-[calc(30.75rem)] top-[calc(11rem)]'></div>
				<div className='hidden lg:block w-8 h-8 bg-gray-300 rounded-full absolute left-[calc(39.35rem)] top-[calc(11rem)]'></div>
				<div className='hidden lg:block w-8 h-8 bg-gray-300 rounded-full absolute left-[calc(52.2rem)] top-[calc(7rem)]'></div>
				<div className='hidden lg:block w-8 h-8 bg-gray-300 rounded-full absolute left-[calc(52.2rem)] top-[calc(15rem)]'></div>

				{FretboardNoteArray.map((note, idx) => {
					return (
						<FretboardNote
							key={idx}
							note={note.note}
							isTop={note.isTop}
							isBottom={note.isBottom}
							isNut={note.isNut}
							isActive={idx === activeNoteIndex ? true : false}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Fretboard;
