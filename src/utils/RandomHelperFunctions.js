import { FlatNotes, SharpNotes } from './Arrays';

export const GetRandomNote = (isSharp) => {
	let notes = isSharp ? SharpNotes : FlatNotes;
	return notes[Math.floor(Math.random() * notes.length)];
};
