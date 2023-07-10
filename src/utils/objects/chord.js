// chord.js

var note = require('./Note');
var interval = require('./Interval');
var scale = require('./Scale');
var _ = require('underscore');

// Parse a chord symbol and return root, chord, bass
export const parseChordSymbol = (chord) => {
	const noteRegex = /[A-Ga-g][#b]{0,2}/;
	let root = chord.match(new RegExp(`^${noteRegex.source}`))[0];
	let bass = null;
	let symbol;

	root = note.create(root);

	// Strip note, strip spaces, strip bass
	symbol = chord
		.replace(/\s/g, '')
		.replace(new RegExp(`^${noteRegex.source}`), '')
		.replace(new RegExp(`/${noteRegex.source}$`), '');

	bass = chord.match(new RegExp(`/${noteRegex.source}$`));
	if (bass) bass = note.create(bass[0].slice(1));

	return { root, symbol, bass };
};

// Replace aliases in chord symbol
const handleAliases = (symbol) => {
	let parentheticals;

	if (symbol === '') return 'M'; // No symbol means major triad

	symbol = symbol
		.replace(/maj/i, 'M')
		.replace(/∆/, 'M')
		.replace(/min/i, 'm')
		.replace(/^-/, 'm')
		.replace(/dom/, '')
		.replace(/^o/, 'dim')
		.replace(/1\/2dim/, 'ø');

	// Remove parentheses unless they are significant, i.e. they contain an 11, or 13
	parentheticals = symbol.match(/\([^\)]*\)/g);
	parentheticals?.forEach((parenthetical) => {
		if (
			parenthetical.indexOf('11') === -1 &&
			parenthetical.indexOf('13') === -1
		) {
			symbol = symbol.replace(parenthetical, parenthetical.slice(1, -1));
		}
	});

	return symbol;
};

// Rotate an array so that the given index is first
const rotateArr = (arr, index) => [...arr.slice(index), ...arr.slice(0, index)];

// Given a chord symbol, return array of interval qualities
const getIntervals = (chord) => {
	let intervals = [];

	// Assume P1, M3. and P5
	intervals[1] = 'P';
	intervals[3] = 'M';
	intervals[5] = 'P';

	// Chords with m3
	if (/^(m|dim|ø|Dim)/.test(chord)) {
		intervals[3] = 'm';
	}
	// Chords with dim5
	if (/(dim|ø|[-b]5|Dim)/.test(chord)) {
		intervals[5] = 'dim';
	}
	// Chords with aug5
	if (/^(aug|\+|Aug)/.test(chord) || /[+#]5/.test(chord)) {
		intervals[5] = 'aug';
	}
	// Chord with no 5th
	if (/no5/.test(chord)) {
		intervals[5] = '';
	}
	// Chords with no 3rd
	else if (/^[5n]/.test(chord) || /no3/.test(chord)) {
		intervals[3] = '';
	}
	// Chords with m7
	if (/(ø|7|9|11|13)/.test(chord)) {
		intervals[7] = 'm';
	}
	// Chords with M7
	if (/(M7|M9|M11|M13)/.test(chord)) {
		intervals[7] = 'M';
	}
	// Chords with dim7
	if (/(dim7|dim9|dim11|dim13)/.test(chord)) {
		intervals[7] = 'dim';
	}
	// 6ths
	if (/6/.test(chord)) {
		intervals[6] = 'M';
		intervals[7] = '';
	}
	// Suspended 2
	if (/sus2/.test(chord)) {
		intervals[2] = 'M';
		intervals[3] = '';
	}
	// Suspended 4
	else if (/sus/.test(chord)) {
		intervals[4] = 'P';
		intervals[3] = '';
	}
	// 9ths
	if (/9/.test(chord)) {
		intervals[9] = 'M';
	}
	if (/[+#]9/.test(chord)) {
		intervals[9] = '';
		intervals[10] = 'm'; // Store #9 as b10 to allow for b9#9
	}
	if (/[-b]9/.test(chord)) {
		intervals[9] = 'm';
	}
	if (/add9/.test(chord)) {
		if (!/7/.test(chord)) intervals[7] = '';
	}
	// 11ths
	if (/[+#]11/.test(chord)) {
		intervals[11] = 'aug';
	} else if (/[-b]11/.test(chord)) {
		intervals[11] = 'dim';
	} else if (/add11/.test(chord) || /\([^\)]*11[^\)]*\)/.test(chord)) {
		intervals[11] = 'P';
		if (/add11/.test(chord) && !/7|9/.test(chord)) {
			intervals[7] = '';
		}
	} else if (/11/.test(chord)) {
		intervals[11] = 'P';
		intervals[9] = intervals[9] || 'M';
	}
	// 13ths
	if (/[-b]13/.test(chord)) {
		intervals[13] = 'm';
	} else if (/add13/.test(chord) || /\([^\)]*13[^\)]*\)/.test(chord)) {
		intervals[13] = 'M';
		if (/add13/.test(chord) && !/7|9|11/.test(chord)) {
			intervals[7] = '';
		}
	} else if (/13/.test(chord)) {
		intervals[13] = 'M';
		intervals[11] = intervals[11] || 'P';
		intervals[9] = intervals[9] || 'M';
	}
	// Exclude 9th or 11th
	if (/no9/.test(chord)) {
		intervals[9] = '';
	}
	// Exclude 9th or 11th
	if (/no11/.test(chord)) {
		intervals[11] = '';
	}

	return intervals;
};

const tryInversion = (inversion) => {
	let root = inversion.root;
	let bass = inversion.bass;
	let notes = inversion.notes;

	// We designate an inversion "reasonable" if we think it is
	// likely to be the correct inversion (default to true)
	let reasonable = true;

	// Return true if interval is present in this chord
	const hasInt = (interval) => {
		return notes.some((n) => root.transpose(interval).enharmonic(n));
	};

	let symbol = '';

	let noThird = false;

	if (hasInt('M3')) {
		if (hasInt('aug5') && !(hasInt('M7') || hasInt('m7'))) {
			symbol += '+';
		}
	} else if (hasInt('m3')) {
		if (hasInt('dim5') && !hasInt('P5') && !hasInt('M7')) {
			if (hasInt('dim7') && !hasInt('m7')) {
				symbol += 'dim7';
			} else if (hasInt('m7')) {
				symbol += 'm';
			} else {
				symbol += 'dim';
			}
		} else {
			symbol += 'm';
		}
	} else {
		if (hasInt('P4')) {
			symbol += 'sus4';
		} else if (hasInt('M2')) {
			symbol += 'sus2';
		} else {
			noThird = true;
		}
	}

	if (hasInt('M7') || hasInt('m7')) {
		if (hasInt('M7')) {
			symbol += 'M';
		}
		if (hasInt('M6')) {
			symbol += '13';
		} else if (hasInt('P4') && (hasInt('M3') || hasInt('m3'))) {
			symbol += '11';
		} else if (hasInt('M2') && (hasInt('M3') || hasInt('m3'))) {
			symbol += '9';
		} else {
			symbol += '7';
		}
	} else if (hasInt('M3') || hasInt('m3')) {
		if (hasInt('M6') && !hasInt('dim5')) {
			symbol += '6';
			if (hasInt('M2')) {
				symbol += '/9';
			}
		}
		if (hasInt('P4')) {
			symbol += 'add11';
		}
		if (!hasInt('M6') && hasInt('M2')) {
			symbol += 'add9';
		}
	}

	if (
		(hasInt('M3') || hasInt('m3')) &&
		hasInt('dim5') &&
		!(hasInt('P5') || hasInt('aug5')) &&
		(hasInt('M7') || hasInt('m7'))
	) {
		symbol += 'b5';
	}
	if (
		hasInt('M3') &&
		hasInt('aug5') &&
		!hasInt('P5') &&
		(hasInt('M7') || hasInt('m7'))
	) {
		symbol += '#5';
	}
	if (hasInt('m2')) {
		symbol += 'b9';
	}
	if (hasInt('M3') && hasInt('aug2')) {
		symbol += '#9';
	}
	if (
		(hasInt('M3') || hasInt('m3')) &&
		hasInt('dim5') &&
		(hasInt('P5') || hasInt('aug5')) &&
		(hasInt('M7') || hasInt('m7'))
	) {
		symbol += '#11';
	}
	if (
		(hasInt('M3') || hasInt('m3')) &&
		hasInt('m6') &&
		hasInt('P5') &&
		(hasInt('M7') || hasInt('m7'))
	) {
		symbol += 'b13';
	}

	if (noThird) {
		if (symbol === '') {
			symbol = '5';
		} else {
			symbol += 'no3';
		}
	}

	if (!root.enharmonic(bass)) {
		symbol += '/' + bass.name;
	}

	// Check if symbol is not reasonable
	if (!symbol.match(/b5|#5|dim/) && !hasInt('P5')) {
		reasonable = false; // Catches most things
	}
	if ((hasInt('P5') || hasInt('dim5')) && hasInt('m3') && hasInt('m6')) {
		reasonable = false; // Catches E, G, B(b), C
	}
	if (symbol.match(/6add11/)) {
		reasonable = false; // Catches G, B(b), C, D, E
	}

	return {
		symbol: root.name + symbol,
		reasonable: reasonable,
	};
};

const getPossibleChords = (...args) => {
	const notes = args.map((n) => note.create(n));

	const inversions = notes.map((n, i) => {
		const inverted = rotateArr(notes, i);
		return {
			root: n,
			bass: notes[0],
			notes: inverted.slice(1),
		};
	});

	return inversions
		.map(tryInversion)
		.sort((a, b) => (a.reasonable ? 0 : 1) - (b.reasonable ? 0 : 1))
		.filter(
			(elem, index, self) =>
				index === self.findIndex((t) => t.symbol === elem.symbol)
		);
};

const getPossibleChordNames = (...args) => {
	return getPossibleChords(...args).map((n) => n.symbol);
};

const getPossibleChordNamesFromArray = (arr) => {
	return getPossibleChordNames(...arr);
};

const identify = (...args) => {
	const results = getPossibleChords(...args);
	const reasonable = results.find((obj) => obj.reasonable);

	const chord = reasonable ? reasonable.symbol : results[0].symbol;

	return chord;
};

const identifyArray = (arr) => {
	return identify(...arr);
};

const makeChord = (root, bass, intervals) => {
	const chord = intervals
		.map((quality, number) => {
			let int;
			if (quality) {
				// #9 is stored as b10, so special case this
				if (number === 10 && quality === 'm') {
					int = interval.create(9, 'aug');
				} else {
					int = interval.create(number, quality);
				}
				return root.transpose(int);
			}
		})
		.filter((note) => note);

	let bassIndex;

	// Handle slash chords
	if (bass && !root.enharmonic(bass)) {
		bassIndex = chord.findIndex((n) => n.enharmonic(bass));

		if (bassIndex > -1) {
			// Rotate chord so bass is first
			chord.unshift(...chord.splice(bassIndex, 1));
		} else {
			// Otherwise, add bass to beginning
			chord.unshift(bass);
		}
	}

	return chord;
};

// Make a chord object given root, symbol, bass
const makeChordObject = (root, symbol, bass) => {
	let name = `${root.name}${symbol}`;
	const octave = bass ? bass.octave : root.octave;

	if (bass) name += `/${bass.name}`;
	return new Chord(name, octave);
};

const optimizeScalePrecedence = (scales, chord) => {
	const exclude = (int) => {
		scales = scales.filter((scale) => !scale.hasInterval(int));
	};

	const include = (index, scaleId) => {
		scales.splice(index, 0, scale.create(chord.root, scaleId));
	};

	if (['m', 'm6', 'm7', 'm9', 'm11', 'm13'].includes(chord.formattedSymbol)) {
		exclude('M3');
	}
	if (
		['7', '9', '11', '13', 'm7', 'm9', 'm11', 'm13'].includes(
			chord.formattedSymbol
		)
	) {
		exclude('M7');
	}
	if (['M7', 'M9', 'M11', 'M13'].includes(chord.formattedSymbol)) {
		exclude('m7');
	}
	if (
		chord.formattedSymbol[0] === '6' ||
		chord.formattedSymbol.slice(0, 2) === 'M6'
	) {
		exclude('m7');
	}
	if (['7', '7#9', '7+9', '7#11', '7+11'].includes(chord.formattedSymbol)) {
		include(2, 'blues');
	}

	return scales;
};

// Given a chord object and an octave number, assign appropriate octave numbers to notes
const setOctave = (obj, octave) => {
	let lastNote = obj.chord[0];

	obj.chord = obj.chord.map((n) => {
		if (n.lowerThan(lastNote)) octave += 1;

		if (n.enharmonic(obj.root)) {
			obj.root = obj.root.inOctave(octave);
		}
		if (obj.bass && n.enharmonic(obj.bass)) {
			obj.bass = obj.bass.inOctave(octave);
		}

		lastNote = n;
		return n.inOctave(octave);
	});
};

class Chord {
	constructor(chord, octave) {
		let intervals;

		this.name = chord;

		chord = parseChordSymbol(chord);

		this.root = chord.root;
		this.symbol = chord.symbol;
		this.formattedSymbol = handleAliases(chord.symbol);
		this.bass = chord.bass;

		intervals = getIntervals(this.formattedSymbol);
		this.chord = makeChord(this.root, this.bass, intervals);

		this.octave = null;
		if (octave) {
			this.octave = octave;
			setOctave(this, octave);
		}

		this.toString = function () {
			return this.chord.join(' ');
		};
	}

	// Return a list of scales that match chord, in order of precedence
	scales() {
		const root = note.create(this.root.name); // Remove octave number
		const chord = this.chord;

		let scales = _.map(scale.precedence, (name) => {
			return scale.create(root, name);
		});

		scales = _.filter(scales, (scale) => {
			return _.every(chord, scale.contains.bind(scale));
		});

		return optimizeScalePrecedence(scales, this);
	}

	// Return highest precedence scale that matches chord
	scale() {
		return this.scales()[0];
	}

	// Return a list of scale names that match chord, in order of precedence
	scaleNames() {
		return _.pluck(this.scales(), 'name');
	}

	transpose(int, down) {
		const root = this.root.transpose(int, down);
		const bass = this.bass ? this.bass.transpose(int, down) : null;
		return makeChordObject(root, this.symbol, bass);
	}

	clean() {
		const root = this.root.clean();
		const bass = this.bass ? this.bass.clean() : null;
		const chord = makeChordObject(root, this.symbol, bass);

		chord.chord = _.map(chord.chord, (note) => {
			return note.clean();
		});

		return chord;
	}

	// Return true if a given note is in a chord, matching octave numbers if applicable
	contains(n) {
		return note.create(n).containedIn(this.chord);
	}

	// Return true if a given interval is in a chord, matching octave numbers if applicable
	hasInterval(int) {
		return note.create(this.root).transpose(int).containedIn(this.chord);
	}

	inOctave(octave) {
		return new Chord(this.name, octave);
	}
}

export const createChord = (chord, octave) => {
	if (chord instanceof Chord)
		return new Chord(chord.name, chord.octave || octave);

	return new Chord(chord, octave);
};

Chord.prototype.transposeDown = _.partial(Chord.prototype.transpose, _, true);

export const isChord = (chord) => {
	return chord instanceof Chord;
};
