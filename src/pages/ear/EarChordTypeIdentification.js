import {
	GetRandomAudioOctave,
	NoteToAudio,
} from '../../utils/AudioHelperFunctions';
import {
	GetRandomChord,
	GetRandomNote,
} from '../../utils/RandomHelperFunctions';
import React, { useEffect, useState } from 'react';

import { FiRefreshCw } from 'react-icons/fi';
import { GetMusicalAlphabetIndex } from '../../utils/Arrays';
import { GiSpeaker } from 'react-icons/gi';
import InputSubmit from '../../components/UI/InputSubmit';

const EarChordTypeIdentification = ({ ActiveNote, IsSharp }) => {
	const [incorrectAnswers, setIncorrectAnswers] = useState(null);

	const [isPlaying, setPlayingStatus] = useState(false);
	const [refreshAnimation, setRefreshAnimationStatus] = useState(false);
	const [audioArray, setAudioArray] = useState(null);
	const [chord, setChord] = useState(null);
	const [chordText, setChordText] = useState('?');
	const [score, setScore] = useState({
		correct: 0,
		total: 0,
	});

	let chordTypes = ['maj', 'min', 'aug', 'dim', 'maj7', 'min7', 'dom7'];

	useEffect(() => {
		SetValues();
	}, []);

	const SetValues = () => {
		let rootNote = ActiveNote ? ActiveNote : GetRandomNote(IsSharp);
		let octave = 2;
		let tempChord = GetRandomChord(rootNote, chordTypes, octave);
		let chordAudioArray = [];

		//No Inversions
		tempChord.chord.map((note) => {
			let noteAudioString = NoteToAudio(
				note,
				GetMusicalAlphabetIndex(rootNote) >= GetMusicalAlphabetIndex(note)
					? octave + 1
					: octave
			);
			let audioObj = new Audio(
				require(`../../assets/guitarSounds/${noteAudioString}`)
			);

			chordAudioArray.push(audioObj);
			return null;
		});

		setAudioArray(chordAudioArray);
		setChord(tempChord);

		setChordText('?');
		setIncorrectAnswers(null);
	};

	const HandleSubmit = (cType) => {
		let isCorrect = cType === chord.symbol;
		if (isCorrect) {
			SetValues();
			setScore(() => {
				return {
					correct: score.correct + 1,
					total: score.total + 1,
				};
			});
		} else {
			let tempIncorrectAnswers = [];
			incorrectAnswers
				? (tempIncorrectAnswers = [...incorrectAnswers, cType])
				: (tempIncorrectAnswers = [cType]);
			setIncorrectAnswers(tempIncorrectAnswers);
			setScore(() => {
				return {
					correct: score.correct,
					total: score.total + 1,
				};
			});
		}
	};

	const HandleRefresh = () => {
		SetValues();
		setIncorrectAnswers(null);
		setRefreshAnimationStatus(true);
	};

	const PlayChord = () => {
		setPlayingStatus(true);
		audioArray.map((audio) => {
			audio.play();
		});

		setTimeout(function () {
			setPlayingStatus(false);
		}, 1000);
	};

	const HandleShowAnswer = () => {
		setChordText(chord.name);
	};

	return (
		<>
			<div className='text-4xl md:text-6xl font-thin mb-8'>{chordText}</div>
			<div className='absolute top-5 right-20 text-gray-500 text-lg'>
				{score.correct}/{score.total}
			</div>
			<GiSpeaker
				className={`text-5xl cursor-pointer ${
					isPlaying ? 'text-purple-500 text-6xl -rotate-12' : 'text-gray-500'
				} transition-all duration-300`}
				onClick={() => {
					PlayChord();
				}}
			/>

			<FiRefreshCw
				className={`my-10 ${
					refreshAnimation && 'animate-refresh'
				} mx-auto text-3xl text-gray-500 cursor-pointer`}
				onClick={() => {
					HandleRefresh();
				}}
				onAnimationEnd={() => {
					setRefreshAnimationStatus(false);
				}}
			/>

			<div
				onClick={() => {
					HandleShowAnswer();
				}}
				className='hover:underline cursor-pointer text-gray-500 mb-4 text-center'>
				Show Answer
			</div>

			<div className='fr-center-center gap-4 flex-wrap mx-auto'>
				{chordTypes?.map((cType, idx) => {
					return (
						<div
							onClick={() => {
								HandleSubmit(cType);
							}}
							key={idx}
							className={`border shrink-0 w-12 h-12 text-center fc-center-center rounded-xl  cursor-pointer transition-all duration-300 hover:h-14 hover:w-14 ${
								incorrectAnswers?.includes(cType)
									? 'border-red-500'
									: 'border-gray-300 hover:border-gray-500'
							}`}>
							{cType}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default EarChordTypeIdentification;
