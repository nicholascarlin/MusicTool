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
