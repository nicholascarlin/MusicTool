import {
	CommonIntervals,
	FlatNotes,
	MajorRomanChordProgression,
	SharpNotes,
} from './Arrays';

import { FretboardNoteArray } from './FretboardNoteArray';
import { note } from '@tonaljs/core';

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

	if (note1.includes('b')) {
		note1 = SharpNotes.find((val) => note(val).height === note(note1).height);
	}
	if (note2.includes('b')) {
		note2 = SharpNotes.find((val) => note(val).height === note(note2).height);
	}

	note1 = note1.replace('#', '-');
	note2 = note2.replace('#', '-');

	console.log(note1.toLowerCase() + octave.toString());
	console.log(
		note2 <= note1
			? note2.toLowerCase() + (octave + 1).toString()
			: note2.toLowerCase() + octave.toString()
	);

	return [
		note1.toLowerCase() + octave.toString(),
		note2 <= note1
			? note2.toLowerCase() + (octave + 1).toString()
			: note2.toLowerCase() + octave.toString(),
	];
};
