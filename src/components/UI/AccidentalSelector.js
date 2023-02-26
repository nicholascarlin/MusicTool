import React, { useState } from 'react';

import FlatAccidental from '../../assets/accidentals/music-accidental-flat.png';
import SharpAccidental from '../../assets/accidentals/music-accidental-sharp.png';

const AccidentalSelector = ({ SetStatus }) => {
	const [activeAccidental, setActiveAccidental] = useState(0);

	return (
		<div className='fr-center mt-4 ml-4'>
			<img
				onClick={() => {
					SetStatus(true);
					setActiveAccidental(0);
				}}
				className={`${
					activeAccidental === 0 ? 'bg-green-500' : ''
				} transition-all duration-300 border-2 rounded-full w-[40px] h-[40px] cursor-pointer`}
				src={SharpAccidental}
				alt='Sharp Accidental'
			/>
			<img
				onClick={() => {
					SetStatus(false);
					setActiveAccidental(1);
				}}
				className={`${
					activeAccidental === 1 ? 'bg-green-500' : ''
				} transition-all duration-300 border-2 rounded-full w-[40px] h-[40px] cursor-pointer`}
				src={FlatAccidental}
				alt='Flat Accidental'
			/>
		</div>
	);
};

export default AccidentalSelector;
