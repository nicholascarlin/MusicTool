import { FlatNotes, SharpNotes } from '../../utils/Arrays';
import React, { useEffect, useState } from 'react';

const NoteSelector = ({ ActiveNote, SetStatus, IsSharp }) => {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		setNotes(IsSharp ? SharpNotes : FlatNotes);
	}, [IsSharp]);

	const handleNoteClick = (note) => {
		SetStatus(note === ActiveNote ? null : note);
	};

	return (
		<>
			<div className='cursor-pointer mt-4 text-center hidden md:fr-center-center gap-2 mx-auto'>
				{notes?.map((note) => {
					return (
						<div
							onClick={() => handleNoteClick(note)}
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
