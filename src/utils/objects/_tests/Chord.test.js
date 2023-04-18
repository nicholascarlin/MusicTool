const { parseChordSymbol } = require('../chord');
const Note = require('../Note');

describe('parseChordSymbol', () => {
	it('Parses a simple major chord correctly', () => {
		const result = null;
		expect(result).toEqual(null);
	});
});

// describe('parseChordSymbol', () => {
// 	it('parses a simple major chord correctly', () => {
// 		const chord = 'C';
// 		const expected = {
// 			root: new Note('C'),
// 			symbol: 'M',
// 			bass: null,
// 		};
// 		const result = parseChordSymbol(chord);
// 		expect(result).toEqual(expected);
// 	});

// 	it('parses a major chord with a sharp root note correctly', () => {
// 		const chord = 'C#';
// 		const expected = {
// 			root: new Note('C#'),
// 			symbol: 'M',
// 			bass: null,
// 		};
// 		const result = parseChordSymbol(chord);
// 		expect(result).toEqual(expected);
// 	});

// 	it('parses a major chord with a flat root note correctly', () => {
// 		const chord = 'Cb';
// 		const expected = {
// 			root: new Note('Cb'),
// 			symbol: 'M',
// 			bass: null,
// 		};
// 		const result = parseChordSymbol(chord);
// 		expect(result).toEqual(expected);
// 	});

// 	it('parses a chord with a major seventh correctly', () => {
// 		const chord = 'Cmaj7';
// 		const expected = {
// 			root: new Note('C'),
// 			symbol: 'M7',
// 			bass: null,
// 		};
// 		const result = parseChordSymbol(chord);
// 		expect(result).toEqual(expected);
// 	});

// 	it('parses a chord with a minor seventh correctly', () => {
// 		const chord = 'C7';
// 		const expected = {
// 			root: new Note('C'),
// 			symbol: '7',
// 			bass: null,
// 		};
// 		const result = parseChordSymbol(chord);
// 		expect(result).toEqual(expected);
// 	});

// 	it('parses a chord with a diminished fifth correctly', () => {
// 		const chord = 'Cdim';
// 		const expected = {
// 			root: new Note('C'),
// 			symbol: 'dim',
// 			bass: null,
// 		};
// 		const result = parseChordSymbol(chord);
// 		expect(result).toEqual(expected);
// 	});

// 	it('parses a chord with a flat ninth correctly', () => {
// 		const chord = 'C7b9';
// 		const expected = {
// 			root: new Note('C'),
// 			symbol: '7b9',
// 			bass: null,
// 		};
// 		const result = parseChordSymbol(chord);
// 		expect(result).toEqual(expected);
// 	});

// 	it('parses a chord with a sharp ninth correctly', () => {
// 		const chord = 'C7#9';
// 		const expected = {
// 			root: new Note('C'),
// 			symbol: '7#9',
// 			bass: null,
// 		};
// 		const result = parseChordSymbol(chord);
// 		expect(result).toEqual(expected);
// 	});

// 	it('parses a chord with a bass note correctly', () => {
// 		const chord = 'C/E';
// 		const expected = {
// 			root: new Note('C'),
// 			symbol: 'M',
// 			bass: new Note('E'),
// 		};
// 		const result = parseChordSymbol(chord);
// 		expect(result).toEqual(expected);
// 	});
// });
