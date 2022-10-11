import { FlatNotes, SharpNotes } from '../../utils/Arrays';
import React, { useEffect, useState } from 'react';

const NoteSelector = ({ ActiveNote, SetStatus, IsSharp }) => {
	const [notes, setNotes] = useState(null);

	useEffect(() => {
		IsSharp === true ? setNotes(SharpNotes) : setNotes(FlatNotes);
	}, [IsSharp]);

	return (
		<div className='cursor-pointer absolute top-4 text-center fr-center-center gap-2 mx-auto right-1/2 translate-x-1/2'>
			{notes?.map((note, idx) => {
				return (
					<div
						key={idx}
						onClick={() => {
							note === ActiveNote ? SetStatus(null) : SetStatus(note);
						}}
						className={`${
							note === ActiveNote ? 'bg-green-400' : ''
						} border-2 w-[40px] h-[40px] rounded-full fr-center-center transition-all duration-150`}>
						{note}
					</div>
				);
			})}
		</div>
	);
};

export default NoteSelector;
