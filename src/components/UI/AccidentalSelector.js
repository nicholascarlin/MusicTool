import React, { useState } from 'react';

import FlatAccidental from '../../assets/accidentals/music-accidental-flat.png';
import SharpAccidental from '../../assets/accidentals/music-accidental-sharp.png';

const accidentalOptions = [
	{ id: 0, name: 'Sharp Accidental', src: SharpAccidental },
	{ id: 1, name: 'Flat Accidental', src: FlatAccidental },
];

const AccidentalSelector = ({ SetStatus }) => {
	const [activeAccidental, setActiveAccidental] = useState(0);

	return (
		<div className='fr-center mt-4 ml-4'>
			{accidentalOptions.map((option) => (
				<img
					key={option.id}
					onClick={() => {
						SetStatus(option.id === 0);
						setActiveAccidental(option.id);
					}}
					className={`border-2 rounded-full w-[40px] h-[40px] cursor-pointer ${
						activeAccidental === option.id ? 'bg-green-500' : ''
					}`}
					src={option.src}
					alt={option.name}
				/>
			))}
		</div>
	);
};
export default AccidentalSelector;
