import { isNote } from './objects/note';

export const SharpNotes = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
];

export const FlatNotes = [
	'C',
	'Db',
	'D',
	'Eb',
	'E',
	'F',
	'Gb',
	'G',
	'Ab',
	'A',
	'Bb',
	'B',
];

export const CommonIntervals = [
	'2m',
	'2M',
	'3m',
	'3M',
	'4p',
	'5p',
	'6m',
	'6M',
	'7m',
	'7M',
];

export const MajorRomanChordProgression = [
	'I',
	'ii',
	'iii',
	'IV',
	'V',
	'vi',
	'vii',
];

export function areArraysSame(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (var i = 0, len = arr1.length; i < len; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}
	return true;
}

/**
 *
 * @param {*} note obj
 * @returns int index
 */
export function GetMusicalAlphabetIndex(note) {
	if (isNote(note)) {
		note = note.clean();
		note =
			note.accidental !== 'n'
				? `${note.letter}${note.accidental}`
				: `${note.letter}`;
	}

	if (note === 'C' || note === 'B#') return 0;
	if (note === 'C#' || note === 'Db') return 1;
	if (note === 'D') return 2;
	if (note === 'D#' || note === 'Eb') return 3;
	if (note === 'E') return 4;
	if (note === 'F' || note === 'E#') return 5;
	if (note === 'F#' || note === 'Gb') return 6;
	if (note === 'G') return 7;
	if (note === 'G#' || note === 'Ab') return 8;
	if (note === 'A') return 9;
	if (note === 'A#' || note === 'Bb') return 10;
	if (note === 'B') return 11;
}
