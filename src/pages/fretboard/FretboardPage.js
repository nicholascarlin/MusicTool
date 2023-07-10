import { FlatNotes, SharpNotes } from '../../utils/Arrays';
import React, { useEffect, useState } from 'react';

import { FiRefreshCw } from 'react-icons/fi';
import Fretboard from '../../components/fretboard/Fretboard';
import { FretboardNoteArray } from '../../utils/FretboardNoteArray';
import { GetRandomFretboardNoteIndex } from '../../utils/RandomHelperFunctions';
import { VerifyFretboardNote } from '../../utils/verificationFunctions/FretboardVerificationFunctions';

const FretboardPage = ({ IsSharp }) => {
	const [score, setScore] = useState({
		correct: 0,
		total: 0,
	});
	const [notes, setNotes] = useState(null);
	const [refreshAnimation, setRefreshAnimationStatus] = useState(false);
	const [incorrectAnswers, setIncorrectAnswers] = useState(null);
	const [activeNoteIndex, setActiveNoteIndex] = useState(
		GetRandomFretboardNoteIndex()
	);

	const [caAnimation, setCAAnimationStatus] = useState(null);

	const SetActiveNoteIndex = () => {
		setActiveNoteIndex(GetRandomFretboardNoteIndex());
	};

	const CorrectAnimationHandler = () => {
		setTimeout(() => {
			setCAAnimationStatus(null);
		}, [1000]);
	};

	const HandleSubmit = (submittedNote) => {
		let isCorrect = VerifyFretboardNote(
			FretboardNoteArray[activeNoteIndex].note,
			submittedNote
		);
		if (isCorrect) {
			setIncorrectAnswers(null);
			SetActiveNoteIndex();
			setCAAnimationStatus(submittedNote);
			CorrectAnimationHandler();
			setScore(() => {
				return {
					correct: score.correct + 1,
					total: score.total + 1,
				};
			});
		} else {
			let tempIncorrectAnswers = [];
			if (incorrectAnswers === null) {
				tempIncorrectAnswers = [submittedNote];
			} else {
				incorrectAnswers.forEach((v) => {
					tempIncorrectAnswers.push(v);
				});
				tempIncorrectAnswers.push(submittedNote);
			}
			setIncorrectAnswers(tempIncorrectAnswers);
			setScore(() => {
				return {
					correct: score.correct,
					total: score.total + 1,
				};
			});
		}
	};

	useEffect(() => {
		IsSharp === true ? setNotes(SharpNotes) : setNotes(FlatNotes);
	}, [IsSharp]);

	return (
		<div className='w-full h-full fc-center'>
			<div className='absolute top-3 right-3 text-gray-500 text-lg'>
				{score.correct}/{score.total}
			</div>
			<Fretboard activeNoteIndex={activeNoteIndex} />
			<FiRefreshCw
				className={`my-10 ${
					refreshAnimation && 'animate-refresh'
				} mx-auto text-3xl text-gray-500 cursor-pointer`}
				onClick={() => {
					SetActiveNoteIndex();
					setIncorrectAnswers(null);
					setRefreshAnimationStatus(true);
				}}
				onAnimationEnd={() => {
					setRefreshAnimationStatus(false);
				}}
			/>
			<div className='fr-center-center gap-4 flex-wrap mx-auto'>
				{notes?.map((note, idx) => {
					return (
						<div
							onClick={() => {
								HandleSubmit(note);
							}}
							key={idx}
							className={`border shrink-0 w-12 h-12 text-center z-10 fc-center-center rounded-xl relative cursor-pointer transition-all duration-300 hover:h-14 hover:w-14 ${
								incorrectAnswers?.includes(note)
									? 'border-red-500'
									: 'border-gray-300 hover:border-gray-500'
							}`}>
							{note}
							<div
								className={`transition-all duration-300 absolute w-12 h-12 hover:h-14 hover:w-14 border border-green-500 z-20 rounded-xl ${
									caAnimation === note ? 'animate-ping' : 'hidden'
								}`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FretboardPage;
