import React, { useState } from 'react';

const InputSubmit = () => {
	const [isAnswerCorrect, setAnswerStatus] = useState(null);

	return (
		<div>
			<input
				type='text'
				placeholder='Answer Here'
				className={`focus:outline-none border-2 block p-4 rounded-full w-72 mt-12 ${
					isAnswerCorrect === null
						? 'border-gray-500'
						: isAnswerCorrect === true
						? 'border-green-500'
						: 'border-red-500'
				} transition-all duration-100`}
			/>
			<div
				onClick={() => {
					setAnswerStatus(null);
				}}
				className='hover:underline cursor-pointer text-gray-500 mt-4 text-center'>
				Show Answer
			</div>
			<button
				onClick={() => {
					setAnswerStatus(false);
				}}
				className='mx-auto block border-2 p-4 px-12 rounded-full mt-6 border-blue-500'>
				Submit
			</button>
		</div>
	);
};

export default InputSubmit;
