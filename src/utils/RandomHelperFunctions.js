import { CommonIntervals, FlatNotes, SharpNotes } from './Arrays';

export const GetRandomNote = (isSharp) => {
	let notes = isSharp ? SharpNotes : FlatNotes;
	return notes[Math.floor(Math.random() * notes.length)];
};

export const GetRandomInterval = () => {
	return CommonIntervals[Math.floor(Math.random() * CommonIntervals.length)];
};
