// interval.js

// Number to name map for interval
// 0 is not a valid interval number
var numberName = [
	null,
	'Unison',
	'Second',
	'Third',
	'Fourth',
	'Fifth',
	'Sixth',
	'Seventh',
	'Octave',
	'Ninth',
	'Tenth',
	'Eleventh',
	'Twelfth',
	'Thirteenth',
	'Fourteenth',
];

// Quality to name map for interval
var qualityName = {
	M: 'Major',
	m: 'Minor',
	P: 'Perfect',
	dim: 'Diminished',
	aug: 'Augmented',
};

// Maps quality of interval to quality of inverted interval
var invertedQualities = { P: 'P', M: 'm', dim: 'aug', m: 'M', aug: 'dim' };

// Number of half steps to each diatonic interval (array index)
var intervalHalfSteps = [null, 0, 2, 4, 5, 7, 9, 11];

// Half step offsets for major and perfect intervals
var perfectOffsets = { dim: -1, P: 0, aug: 1 };
var majorOffsets = { dim: -2, m: -1, M: 0, aug: 1 };

export const isPerfect = (n) => [1, 4, 5, 8, 11, 12].includes(n);

export const rejectInvalidIntervals = (number, quality) => {
	const isPerfect = [1, 4, 5, 8, 11, 12].includes(number);
	const badPerfect = isPerfect && ['M', 'm'].includes(quality);
	const badMajor = !isPerfect && quality === 'P';

	if (badPerfect || badMajor || number > 14 || number < 1) {
		throw new Error(`Invalid interval: ${quality}${number}`);
	}
};

export const handleAliases = (quality) => {
	return quality
		.replace(/^A$/, 'aug')
		.replace(/^d$/, 'dim')
		.replace(/^maj$/, 'M')
		.replace(/^min$/, 'm')
		.replace(/^perf$/, 'P');
};

// Parse a string and return an interval object
export const parse = (interval) => {
	let quality;
	let number;

	if (interval instanceof Interval) return interval;

	quality = interval.replace(/[0-9+]/g, ''); // Remove digits and '+'
	number = parseInt(interval.replace(/\D/g, ''), 10); // Remove non-digits

	if (!quality) {
		// No quality given, assume major or perfect
		quality = isPerfect(number) ? 'P' : 'M';
	}

	return new Interval(number, quality);
};

export class Interval {
	constructor(number, quality) {
		this.quality = handleAliases(quality);
		rejectInvalidIntervals(number, this.quality);

		this.number = number;

		// Abbreviated interval name
		// Example: M6
		this.name = `${this.quality}${this.number}`;

		// Full interval name
		// Example : Major Sixth
		this.fullName = `${qualityName[this.quality]} ${numberName[this.number]}`;
	}

	toString() {
		return this.name;
	}
}

// Return the equivalent interval in the opposite direction, e.g. m3 -> M6
Interval.prototype.invert = function () {
	var quality = invertedQualities[this.quality];
	var number;

	if (this.number === 1 || this.number === 8) number = this.number;
	else if (this.number < 8) number = 9 - this.number;
	else number = 23 - this.number;

	return new Interval(number, quality);
};

// Return number of half steps in interval
Interval.prototype.halfSteps = function () {
	const offsetMap = isPerfect(this.number) ? perfectOffsets : majorOffsets;
	const number = this.number > 7 ? this.number - 7 : this.number;
	return intervalHalfSteps[number] + offsetMap[this.quality];
};

export function create(number, quality) {
	return new Interval(number, quality);
}
