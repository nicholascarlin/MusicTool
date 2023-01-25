import React, { useEffect, useRef, useState } from 'react';

import { GetRandomChord } from '../../utils/RandomHelperFunctions';
import { GiSpeaker } from 'react-icons/gi';
import InputSubmit from '../../components/UI/InputSubmit';

const ChordTypeIdentification = ({ IsSharp }) => {
	const [isAnswerCorrect, setAnswerCorrectStatus] = useState(null);
	const [isPlaying, setPlayingStatus] = useState(false);
	const [incorrectAnswers, setIncorrectAnswers] = useState(null);

	const inputRef = useRef();

	useEffect(() => {
		GetRandomChord(IsSharp, selectedChordTypes);
	}, []);

	const OnRefresh = () => {
		console.log('Refresh');
	};

	const OnSubmit = (submittedType) => {
		//Answer Verification
		let isCorrect = false;

		if (isCorrect) {
			setIncorrectAnswers(null);
			// SetActiveNoteIndex();
		} else {
			let tempIncorrectAnswers = [];
			if (incorrectAnswers === null) {
				tempIncorrectAnswers = [submittedType];
			} else {
				incorrectAnswers.forEach((v) => {
					tempIncorrectAnswers.push(v);
				});
				tempIncorrectAnswers.push(submittedType);
			}
			setIncorrectAnswers(tempIncorrectAnswers);
		}
	};

	const OnShowAnswer = () => {
		console.log('Show Answer');
	};

	const PlayChord = () => {
		console.log('Play Chord');
	};

	const selectedChordTypes = ['maj', 'min', 'maj7', 'min7', 'dim', 'aug'];

	return (
		<>
			<div className='flex space-x-4 mb-8'>
				{selectedChordTypes.map((type, idx) => {
					return (
						<div
							onClick={() => {
								OnSubmit(type);
							}}
							key={idx + type}
							className={`border shrink-0 w-12 h-12 text-center fc-center-center rounded-xl  cursor-pointer transition-all duration-300 hover:h-14 hover:w-14 ${
								incorrectAnswers?.includes(type)
									? 'border-red-500'
									: 'border-gray-300 hover:border-gray-500'
							}`}>
							{type}
						</div>
					);
				})}
			</div>

			<GiSpeaker
				className={`text-5xl mb-10 cursor-pointer ${
					isPlaying ? 'text-purple-500 text-6xl -rotate-12' : 'text-gray-500'
				} transition-all duration-300`}
				onClick={() => {
					PlayChord();
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

export default ChordTypeIdentification;
