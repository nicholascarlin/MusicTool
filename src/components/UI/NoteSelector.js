import { FlatNotes, SharpNotes } from '../../utils/Arrays';
import React, { useEffect, useState } from 'react';

const NoteSelector = ({ ActiveNote, SetStatus, IsSharp }) => {
	const [notes, setNotes] = useState(null);

	useEffect(() => {
		IsSharp === true ? setNotes(SharpNotes) : setNotes(FlatNotes);
	}, [IsSharp]);

	return (
		<>
			<div className='cursor-pointer mt-4 text-center hidden md:fr-center-center gap-2 mx-auto'>
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
			<select
				onChange={(e) => {
					console.log(e.target.value);
					e.target.value !== '-' ? SetStatus(e.target.value) : SetStatus(null);
				}}
				className='md:hidden cursor-pointer mt-4 p-4 border border-gray-500 rounded-xl'>
				<option value={null}>-</option>
				{notes?.sort().map((note, idx) => {
					return (
						<option key={idx} value={note}>
							{note}
						</option>
					);
				})}
			</select>
		</>
	);
};

export default NoteSelector;
