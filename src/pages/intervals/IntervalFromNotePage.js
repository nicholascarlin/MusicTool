import React, { useState } from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { GetRandomNote } from '../../utils/RandomHelperFunctions';
import InputSubmit from '../../components/UI/InputSubmit';

const IntervalFromNotePage = ({ IsSharp }) => {
	const [note1, setNote1] = useState(GetRandomNote(IsSharp));
	const [note2, setNote2] = useState(GetRandomNote(IsSharp));

	const OnRefresh = () => {
		console.log('refresh', GetRandomNote(IsSharp));
	};

	return (
		<div className='fc-center-full-full mt-40'>
			<div className='text-9xl font-thin pb-4 fr-center justify-center'>
				<div className='w-1/4'>{note1}</div>
				<span>
					<AiOutlineArrowRight className='w-1/4 text-5xl text-gray-500 mx-8' />
				</span>
				<div className='w-1/4'>{note2}</div>
			</div>
			<InputSubmit OnRefresh={OnRefresh} />
		</div>
	);
};

export default IntervalFromNotePage;
