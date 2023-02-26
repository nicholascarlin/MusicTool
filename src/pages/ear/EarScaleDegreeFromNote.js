import {
	GetRandomAudioOctave,
	NoteToAudio,
} from '../../utils/AudioHelperFunctions';
import { Note, displayNote } from '../../utils/objects/note';
import React, { useEffect, useRef, useState } from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { GetMusicalAlphabetIndex } from '../../utils/Arrays';
import { GetTwoRandomScaleNotesAndDegree } from '../../utils/RandomHelperFunctions';
import { GiSpeaker } from 'react-icons/gi';
import InputSubmit from '../../components/UI/InputSubmit';

const EarScaleDegreeFromNote = ({ ActiveNote, IsSharp }) => {
	// TODO: Allow Note 1 to be set
	// TODO: Make not just major

	const [note1, setNote1] = useState(null);
	const [note1Audio, setNote1Audio] = useState(null);
	const [note2Audio, setNote2Audio] = useState(null);
	const [note2Text, setNote2Text] = useState('?');
	const [answer, setAnswer] = useState(null);
	const [isAnswerCorrect, setAnswerCorrectStatus] = useState(null);
	const [isPlaying, setPlayingStatus] = useState(false);

	const inputRef = useRef();

	useEffect(() => {
		SetValues();
	}, []);

	const SetValues = () => {
		let tempDegrees = GetTwoRandomScaleNotesAndDegree(ActiveNote, IsSharp);
		let octave = GetRandomAudioOctave();

		setNote1(tempDegrees[0]);
		setAnswer(tempDegrees[2]);
		setNote2Text('?');
		setAnswerCorrectStatus(null);
		inputRef.current.value = '';

		let tempNote1Audio = NoteToAudio(tempDegrees[0], octave);

		let tempNote2Audio = NoteToAudio(
			tempDegrees[1],
			GetMusicalAlphabetIndex(tempDegrees[0]) >=
				GetMusicalAlphabetIndex(tempDegrees[1])
				? octave + 1
				: octave
		);

		setNote1Audio(
			new Audio(require(`../../assets/guitarSounds/${tempNote1Audio}`))
		);
		setNote2Audio(
			new Audio(require(`../../assets/guitarSounds/${tempNote2Audio}`))
		);
	};

	const OnRefresh = () => {
		SetValues();
	};

	const OnSubmit = () => {
		let inputVal = inputRef.current.value;
		if (inputVal !== '') {
			setAnswerCorrectStatus(inputVal.toString() === answer.toString());
		} else {
			setAnswerCorrectStatus(false);
		}
	};

	const OnShowAnswer = () => {
		inputRef.current.value = answer;
		setNote2Text(answer);
		setAnswerCorrectStatus(null);
	};

	const PlayInterval = () => {
		try {
			setPlayingStatus(true);
			note1Audio.play();
			setTimeout(function () {
				note2Audio.play();
				setTimeout(function () {
					setPlayingStatus(false);
				}, 1000);
			}, 1000);
		} catch (e) {
			alert("Uh Oh! This shouldn't happen...");
			setPlayingStatus(false);
			return;
		}
	};

	return (
		<>
			<div className='text-6xl md:text-9xl font-thin pb-4 grid grid-cols-3 bg items-center'>
				<div className='text-center col-span-1'>{displayNote(note1) || ''}</div>
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

export default EarScaleDegreeFromNote;
