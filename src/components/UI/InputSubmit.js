import React, { useEffect, useState } from 'react';

import { FiRefreshCw } from 'react-icons/fi';

const InputSubmit = ({
	IsAnswerCorrect,
	InputRef,
	OnRefresh,
	OnSubmit,
	OnShowClick,
}) => {
	const [refreshAnimation, setRefreshAnimationStatus] = useState(false);

	useEffect(() => {
		setButtonText(IsAnswerCorrect === true ? 'Next' : 'Submit');
	}, [IsAnswerCorrect]);

	const handleSubmit = () => {
		if (IsAnswerCorrect !== true || IsAnswerCorrect === null) {
			OnSubmit();
		} else {
			OnRefresh();
		}
		setButtonText('Submit');
	};

	const [buttonText, setButtonText] = useState('Submit');
	const handleClick = () => {
		if (IsAnswerCorrect !== true || IsAnswerCorrect === null) {
			handleSubmit();
		} else {
			OnRefresh();
		}
	};

	return (
		<div>
			<FiRefreshCw
				className={`${
					refreshAnimation && 'animate-refresh'
				} mx-auto text-3xl text-gray-500 cursor-pointer`}
				onClick={() => {
					OnRefresh();
					setRefreshAnimationStatus(true);
				}}
				onAnimationEnd={() => {
					setRefreshAnimationStatus(false);
				}}
			/>
			<input
				ref={InputRef}
				type='text'
				placeholder='Answer Here'
				className={`focus:outline-none border-2 block p-4 rounded-full w-72 mt-10 ${
					IsAnswerCorrect === null
						? 'border-gray-500'
						: IsAnswerCorrect === true
						? 'border-green-500'
						: 'border-red-500'
				} transition-all duration-100`}
			/>
			<div
				onClick={OnShowClick}
				className='hover:underline cursor-pointer text-gray-500 mt-4 text-center'>
				Show Answer
			</div>
			<button
				onClick={handleClick}
				className='mx-auto block border-2 p-4 px-12 rounded-full mt-6 border-blue-500'>
				{buttonText}
			</button>
		</div>
	);
};

export default InputSubmit;
