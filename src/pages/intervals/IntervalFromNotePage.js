import React, { useEffect, useRef, useState } from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { GetRandomNote } from '../../utils/RandomHelperFunctions';
import InputSubmit from '../../components/UI/InputSubmit';
import { Interval } from '@tonaljs/tonal';
import { VerifyIntervals } from '../../utils/IntervalVerificationFunctions';

const IntervalFromNotePage = ({ ActiveNote, IsSharp }) => {
	// TODO: Allow Note 1 to be set
	const [note1, setNote1] = useState(
		ActiveNote === null ? GetRandomNote(IsSharp) : ActiveNote
	);
	const [note2, setNote2] = useState(GetRandomNote(IsSharp));
	const [answer, setAnswer] = useState(null);
	const [isAnswerCorrect, setAnswerCorrectStatus] = useState(null);

	const inputRef = useRef();

	useEffect(() => {
		setAnswer(Interval.distance(note1, note2));
	}, [note1, note2]);

	const OnRefresh = () => {
		ActiveNote === null
			? setNote1(GetRandomNote(IsSharp))
			: setNote1(ActiveNote);
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
			<div className='text-9xl font-thin pb-4 grid grid-cols-3 bg items-center'>
				<div className='text-center col-span-1'>{note1}</div>
				<span className='col-span-1 text-center'>
					<AiOutlineArrowRight className='w-72 text-5xl text-gray-500 ' />
				</span>
				<div className='text-center col-span-1'>{note2}</div>
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
