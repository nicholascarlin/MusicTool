import { AiFillCaretLeft } from 'react-icons/ai';
import FilterDropdown from '../UI/FilterDropdown';
import React from 'react';

const IntervalsFilters = () => {
	return (
		<div className='h-full w-full overflow-y-scroll'>
			<div className='text-center mt-4 underline underline-offset-4 fr-center-center'>
				Note From Interval <AiFillCaretLeft />
			</div>
			<FilterDropdown />
		</div>
	);
};

export default IntervalsFilters;
