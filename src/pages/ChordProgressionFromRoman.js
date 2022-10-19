import {
	GetRandomChordProgression,
	GetRandomNote,
} from '../utils/RandomHelperFunctions';
import React, { useEffect, useRef, useState } from 'react';

import InputSubmit from '../components/UI/InputSubmit';
import { Progression } from '@tonaljs/tonal';
import { VerifyChordProgressionFromRoman } from '../utils/ChordVerificationFunctions';

const ChordsProgressionFromRoman = ({ ActiveNote, IsSharp }) => {
	const inputRef = useRef();

	const [key, setKey] = useState(
		ActiveNote === null ? GetRandomNote(IsSharp) : ActiveNote
	);
	const [romanProgression, setRomanProgression] = useState(
		GetRandomChordProgression()
	);
	const [answer, setAnswer] = useState(null);
	const [isAnswerCorrect, setAnswerCorrectStatus] = useState(null);

	useEffect(() => {
		setAnswer(Progression.fromRomanNumerals(key, romanProgression));
	}, [key, romanProgression]);

	const OnRefresh = () => {
		ActiveNote === null ? setKey(GetRandomNote(IsSharp)) : setKey(ActiveNote);
		setRomanProgression(GetRandomChordProgression());
		setAnswerCorrectStatus(null);
		inputRef.current.value = '';
	};

	const OnSubmit = () => {
		console.log(
			VerifyChordProgressionFromRoman(answer, inputRef.current.value)
		);
	};

	const OnShowAnswer = () => {
		inputRef.current.value = Progression.fromRomanNumerals(
			key,
			romanProgression
		);
		setAnswerCorrectStatus(null);
	};

	return (
		<div>
			<div className='fc-center'>
				<div>{key}</div>
				<div className='fr-center gap-10'>
					{romanProgression.map((chord, idx) => {
						return <div key={idx}>{chord}</div>;
					})}
				</div>
			</div>
			<InputSubmit
				InputRef={inputRef}
				OnSubmit={OnSubmit}
				OnRefresh={OnRefresh}
				OnShowClick={OnShowAnswer}
				IsAnswerCorrect={isAnswerCorrect}
				SetIsAnswerStatus={setAnswerCorrectStatus}
			/>
		</div>
	);
};

export default ChordsProgressionFromRoman;
