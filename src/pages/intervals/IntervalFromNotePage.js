import { AiOutlineArrowRight } from 'react-icons/ai';
import InputSubmit from '../../components/UI/InputSubmit';
import React from 'react';

const IntervalFromNotePage = () => {
	return (
		<div className='fc-center-full-full mt-40'>
			<div className='text-9xl font-thin pb-4 fr-center'>
				N
				<span>
					<AiOutlineArrowRight className='text-5xl text-gray-500 mx-8' />
				</span>
				N
			</div>
			<InputSubmit />
		</div>
	);
};

export default IntervalFromNotePage;
