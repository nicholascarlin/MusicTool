import {
	CommonIntervals,
	FlatNotes,
	MajorRomanChordProgression,
	SharpNotes,
} from './Arrays';

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
	startsOnTonic = true
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
		console.log(x);
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result.reverse();
};
