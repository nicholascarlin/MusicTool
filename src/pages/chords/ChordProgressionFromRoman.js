import {
	GetRandomChordProgression,
	GetRandomNote,
} from '../../utils/RandomHelperFunctions';
import React, { useEffect, useRef, useState } from 'react';

import InputSubmit from '../../components/UI/InputSubmit';
import { Progression } from '@tonaljs/tonal';
import { VerifyChordProgressionFromRoman } from '../../utils/verificationFunctions/ChordVerificationFunctions';

const ChordsProgressionFromRoman = ({
	ActiveNote,
	IsSharp,
	ActiveChordProgression,
}) => {
	// TODO: Needs to be CSV and doesn't account for Major and Minor

	const inputRef = useRef();
	const [romanProgression, setRomanProgression] = useState(
		GetRandomChordProgression()
	);

	const HandleChordProgression = () => {
		let initialCP = GetRandomChordProgression();
		let tempArr = initialCP;
		for (let i = 0; i < initialCP.length; i++) {
			if (ActiveChordProgression[i] != 0) {
				tempArr[i] = ActiveChordProgression[i];
			}
		}
		setRomanProgression(tempArr);
		return tempArr;
	};

	const [key, setKey] = useState(
		ActiveNote === null ? GetRandomNote(IsSharp) : ActiveNote
	);

	const [answer, setAnswer] = useState(null);
	const [isAnswerCorrect, setAnswerCorrectStatus] = useState(null);

	useEffect(() => {
		if (romanProgression) {
			setAnswer(Progression.fromRomanNumerals(key, romanProgression));
		}
	}, [key, romanProgression]);

	const OnRefresh = () => {
		ActiveNote === null ? setKey(GetRandomNote(IsSharp)) : setKey(ActiveNote);
		setRomanProgression(HandleChordProgression());
		setAnswerCorrectStatus(null);
		inputRef.current.value = '';
	};

	const OnSubmit = () => {
		if (inputRef.current.value !== '') {
			setAnswerCorrectStatus(
				VerifyChordProgressionFromRoman(answer, inputRef.current.value)
			);
		} else {
			setAnswerCorrectStatus(false);
		}
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
				<div className='text-5xl md:text-9xl mb-4'>{key}</div>
				<div className='fr-center gap-10 text-3xl md:text-5xl mb-8'>
					{romanProgression?.map((chord, idx) => {
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
