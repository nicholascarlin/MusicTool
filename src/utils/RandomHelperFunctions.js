import {
	CommonIntervals,
	FlatNotes,
	GetMusicalAlphabetIndex,
	MajorRomanChordProgression,
	SharpNotes,
} from './Arrays';

import { FretboardNoteArray } from './FretboardNoteArray';
import Scale from './objects/scale';

export const GetRandomNote = (isSharp) => {
	let notes = isSharp ? SharpNotes : FlatNotes;
	return notes[Math.floor(Math.random() * notes.length)];
};

export const GetRandomInterval = () => {
	return CommonIntervals[Math.floor(Math.random() * CommonIntervals.length)];
};

export const GetRandomChordProgression = (
	arr = MajorRomanChordProgression,
	n = 4,
	startsOnTonic = false
) => {
	let isFirst = startsOnTonic;
	var result = new Array(n),
		len = arr.length,
		taken = new Array(len);
	if (n > len)
		throw new RangeError('getRandom: more elements taken than available');
	while (n--) {
		var x = isFirst ? 0 : Math.floor(Math.random() * len);
		isFirst = false;
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result.reverse();
};

export const GetRandomFretboardNoteIndex = () => {
	return Math.floor(Math.random() * FretboardNoteArray.length);
};

export const FormatEarNotes = (note1, note2) => {
	var octave = Math.floor(Math.random() * (4 - 3) + 3);

	let isLower =
		GetMusicalAlphabetIndex(note1) >= GetMusicalAlphabetIndex(note2);

	note1 = note1.replace('#', '-');
	note2 = note2.replace('#', '-');

	return [
		note1 + octave.toString(),
		isLower ? note2 + (octave + 1).toString() : note2 + octave.toString(),
	];
};

export const GetRandomScale = (selectedNote) => {
	let note = selectedNote ? selectedNote : GetRandomNote();
	let scale = new Scale(note, 'Major');
	return scale;
};

/**
 *
 * @param {string} startingNote
 * @returns {Array} Array [Note1, Note2, degree]
 */
export const GetTwoRandomScaleNotesAndDegree = (startingNote, isSharp) => {
	let firstNote = startingNote ? startingNote : GetRandomNote(isSharp);
	let scale = GetRandomScale(firstNote);

	let randDegree = Math.floor(Math.random() * scale.scale.length);

	return [
		scale.scale[0],
		scale.scale[randDegree],
		randDegree === 0 ? 8 : randDegree + 1,
	];
};
