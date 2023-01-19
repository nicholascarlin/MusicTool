import {
	GetRandomInterval,
	GetRandomNote,
} from '../../utils/RandomHelperFunctions';
import React, { useEffect, useRef, useState } from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';
import InputSubmit from '../../components/UI/InputSubmit';
import { Note } from '@tonaljs/tonal';
import { VerifyNoteFromInterval } from '../../utils/verificationFunctions/IntervalVerificationFunctions';

const NoteFromIntervalPage = ({ ActiveNote, IsSharp }) => {
	// TODO: Allow Note 1 to be set
	const [note1, setNote1] = useState(
		ActiveNote === null ? GetRandomNote(IsSharp) : ActiveNote
	);
	const [interval, setInterval] = useState(GetRandomInterval());
	const [answer, setAnswer] = useState(null);
	const [isAnswerCorrect, setAnswerCorrectStatus] = useState(null);

	const inputRef = useRef();

	useEffect(() => {
		if (interval.includes('p')) {
			setAnswer(Note.transpose(note1, interval.toUpperCase()));
		} else {
			setAnswer(Note.transpose(note1, interval));
		}
	}, [note1, interval]);

	const OnRefresh = () => {
		ActiveNote === null
			? setNote1(GetRandomNote(IsSharp))
			: setNote1(ActiveNote);
		setInterval(GetRandomInterval());
		setAnswerCorrectStatus(null);
		inputRef.current.value = '';
	};

	const OnSubmit = () => {
		if (inputRef.current.value !== '') {
			setAnswerCorrectStatus(
				VerifyNoteFromInterval(inputRef.current.value, answer)
			);
		} else {
			setAnswerCorrectStatus(false);
		}
	};

	const OnShowAnswer = () => {
		if (interval.includes('p')) {
			inputRef.current.value = Note.transpose(note1, interval.toUpperCase());
		} else {
			inputRef.current.value = Note.transpose(note1, interval);
		}
		setAnswerCorrectStatus(null);
	};

	return (
		<>
			<div className='text-6xl md:text-9xl font-thin pb-4 grid grid-cols-3 bg items-center'>
				<div className='text-center col-span-1'>{note1}</div>
				<span className='col-span-1 text-center'>
					<AiOutlineArrowRight className='w-32 md:w-72 text-5xl text-gray-500' />
				</span>
				<div className='text-center col-span-1'>
					{interval?.split('').reverse().join('')}
				</div>
			</div>

			<InputSubmit
				InputRef={inputRef}
				SetIsAnswerStatus={setAnswerCorrectStatus}
				OnSubmit={OnSubmit}
				OnRefresh={OnRefresh}
				IsAnswerCorrect={isAnswerCorrect}
				OnShowClick={OnShowAnswer}
			/>
		</>
	);
};

export default NoteFromIntervalPage;
