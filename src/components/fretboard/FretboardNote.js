import React from 'react';

const FretboardNote = ({ note, isTop, isBottom, isNut, isActive }) => {
	return (
		<div
			className={`relative fr-center-center text-center border-y-0 border p-4 ${
				isTop ? 'border-t-0' : isBottom ? 'border-b-0' : null
			} ${isNut ? 'border-l-0 border-r-4' : null}`}>
			<div
				className={`rounded-full p-4 z-10 ${
					isActive ? 'bg-red-500' : ''
				}`}></div>
			<div className='absolute top-0 bottom-0 my-auto w-full h-0.5 bg-gray-300 -z-1'></div>
		</div>
	);
};

export default FretboardNote;
