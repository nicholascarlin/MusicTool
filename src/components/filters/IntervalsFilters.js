import React, { useRef } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';

const IntervalsFilters = () => {
	const inputRef = useRef();

	return (
		<div
			onClick={() => {
				inputRef.current.focus();
			}}
			className='relative w-3/4 border-2 p-2 rounded-xl'>
			<AiFillCaretDown className='absolute right-2 top-0 bottom-0 my-auto' />
			<select
				ref={inputRef}
				className='appearance-none w-full'
				placeholder='Choose Your Interval Excercise'>
				<option>Find Interval From Two Notes</option>
				<option>Find Note From Interval</option>
			</select>
		</div>
	);
};

export default IntervalsFilters;
