import {
	FormatEarNotes,
	GetRandomNote,
} from '../../utils/RandomHelperFunctions';
import React, { useEffect, useRef, useState } from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { GiSpeaker } from 'react-icons/gi';
import InputSubmit from '../../components/UI/InputSubmit';
import { Interval } from '@tonaljs/tonal';
import { VerifyIntervals } from '../../utils/verificationFunctions/IntervalVerificationFunctions';

const EarIntervalFromNotesPage = ({ ActiveNote, IsSharp }) => {
	const [note1, setNote1] = useState(
		ActiveNote === null ? GetRandomNote(IsSharp) : ActiveNote
	);
	const [note2, setNote2] = useState(GetRandomNote(IsSharp));
	const [note2Text, setNote2Text] = useState('?');
	const [note1Audio, setNote1Audio] = useState(null);
	const [note2Audio, setNote2Audio] = useState(null);
	const [answer, setAnswer] = useState(null);
	const [isAnswerCorrect, setAnswerCorrectStatus] = useState(null);
	const [isPlaying, setPlayingStatus] = useState(false);

	const inputRef = useRef();

	useEffect(() => {
		setAnswer(Interval.distance(note1, note2));
		SetAudio();
	}, [note1, note2]);

	const SetAudio = () => {
		let noteStrings = FormatEarNotes(note1, note2);

		setNote1Audio(
			new Audio(require(`../../assets/guitarSounds/${noteStrings[0]}.mp3`))
		);
		setNote2Audio(
			new Audio(require(`../../assets/guitarSounds/${noteStrings[1]}.mp3`))
		);
	};

	const OnRefresh = () => {
		ActiveNote === null
			? setNote1(GetRandomNote(IsSharp))
			: setNote1(ActiveNote);
		setNote2(GetRandomNote(IsSharp));
		setNote2Text('?');
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
		setNote2Text(note2);
		setAnswerCorrectStatus(null);
	};

	const PlayInterval = () => {
		setPlayingStatus(true);
		note1Audio.play();
		setTimeout(function () {
			note2Audio.play();
			setTimeout(function () {
				setPlayingStatus(false);
			}, 1000);
		}, 1000);
	};

	return (
		<>
			<div className='text-6xl md:text-9xl font-thin pb-4 grid grid-cols-3 bg items-center'>
				<div className='text-center col-span-1'>{note1}</div>
				<span className='col-span-1 text-center'>
					<AiOutlineArrowRight className='w-32 md:w-72 text-5xl text-gray-500 ' />
				</span>
				<div className='text-center col-span-1'>{note2Text}</div>
			</div>

			<GiSpeaker
				className={`text-5xl mb-10 cursor-pointer ${
					isPlaying ? 'text-purple-500 text-6xl -rotate-12' : 'text-gray-500'
				} transition-all duration-300`}
				onClick={() => {
					PlayInterval();
				}}
			/>

			<InputSubmit
				InputRef={inputRef}
				OnSubmit={OnSubmit}
				OnRefresh={OnRefresh}
				SetIsAnswerStatus={setAnswerCorrectStatus}
				IsAnswerCorrect={isAnswerCorrect}
				OnShowClick={OnShowAnswer}
			/>
		</>
	);
};

export default EarIntervalFromNotesPage;
