import React, { useEffect, useRef, useState } from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { GetRandomNote } from '../../utils/RandomHelperFunctions';
import InputSubmit from '../../components/UI/InputSubmit';
import { Interval } from '@tonaljs/tonal';
import { VerifyIntervals } from '../../utils/IntervalVerificationFunctions';

const IntervalFromNotePage = ({ IsSharp }) => {
	// TODO: Allow Note 1 to be set
	const [note1, setNote1] = useState(GetRandomNote(IsSharp));
	const [note2, setNote2] = useState(GetRandomNote(IsSharp));
	const [answer, setAnswer] = useState(null);
	const [isAnswerCorrect, setAnswerCorrectStatus] = useState(null);

	const inputRef = useRef();

	useEffect(() => {
		setAnswer(Interval.distance(note1, note2));
	}, [note1, note2]);

	const OnRefresh = () => {
		setNote1(GetRandomNote(IsSharp));
		setNote2(GetRandomNote(IsSharp));
		setAnswerCorrectStatus(null);
		inputRef.current.value = '';
	};

	const OnSubmit = () => {
		if (inputRef.current.value !== '') {
			setAnswerCorrectStatus(VerifyIntervals(inputRef.current.value, answer));
		} else {
			setAnswerCorrectStatus(false);
		}
	};

	const OnShowAnswer = () => {
		inputRef.current.value = Interval.distance(note1, note2);
		setAnswerCorrectStatus(null);
	};

	return (
		<div className='fc-center-full-full mt-40'>
			<div className='text-9xl font-thin pb-4 flex items-center'>
				<div className='basis-0 grow'>{note1}</div>
				<span>
					<AiOutlineArrowRight className='flex-1 w-72 text-5xl text-gray-500' />
				</span>
				<div className='basis-0 grow text-right'>{note2}</div>
			</div>
			<InputSubmit
				InputRef={inputRef}
				OnSubmit={OnSubmit}
				OnRefresh={OnRefresh}
				IsAnswerCorrect={isAnswerCorrect}
				OnShowClick={OnShowAnswer}
			/>
		</div>
	);
};

export default IntervalFromNotePage;
