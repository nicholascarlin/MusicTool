import React, { useRef } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';

const EarFilters = ({ SetActiveSubTask }) => {
	const inputRef = useRef();

	return (
		<>
			<div className='-mt-14 mb-8 underline text-lg'>Ear Filters</div>
			<div
				onClick={() => {
					inputRef.current.focus();
				}}
				className='relative w-3/4 border-2 p-2 rounded-xl'>
				<AiFillCaretDown className='absolute right-2 top-0 bottom-0 my-auto' />
				<select
					onChange={(e) => SetActiveSubTask(e.target.value)}
					ref={inputRef}
					className='appearance-none w-full'
					placeholder='Choose Your Interval Excercise'>
					<option value={0}>Find Interval From Two Notes</option>
					<option value={1}>Find Scale Degree From Two Notes</option>
				</select>
			</div>
		</>
	);
};

export default EarFilters;
