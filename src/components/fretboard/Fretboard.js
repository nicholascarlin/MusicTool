import React from 'react';
import fretboard from '../../assets/images/fretboard.webp';

const Fretboard = () => {
	return (
		<div className=''>
			<div className='bg-red-500 relative -mt-40'>
				<img src={fretboard} className='none' />
				<div className='absolute top-32 left-26 bg-green-400'>1</div>
			</div>
		</div>
	);
};

export default Fretboard;
