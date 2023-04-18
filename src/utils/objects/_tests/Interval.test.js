import {
	Interval,
	create,
	handleAliases,
	isPerfect,
	parse,
	rejectInvalidIntervals,
} from '../Interval';

describe('isPerfect', () => {
	it('should return true for perfect intervals', () => {
		expect(isPerfect(1)).toBe(true);
		expect(isPerfect(4)).toBe(true);
		expect(isPerfect(5)).toBe(true);
		expect(isPerfect(8)).toBe(true);
		expect(isPerfect(11)).toBe(true);
		expect(isPerfect(12)).toBe(true);
	});

	it('should return false for non-perfect intervals', () => {
		expect(isPerfect(2)).toBe(false);
		expect(isPerfect(3)).toBe(false);
		expect(isPerfect(6)).toBe(false);
		expect(isPerfect(7)).toBe(false);
		expect(isPerfect(9)).toBe(false);
		expect(isPerfect(10)).toBe(false);
		expect(isPerfect(13)).toBe(false);
		expect(isPerfect(14)).toBe(false);
	});
});

describe('rejectInvalidIntervals', () => {
	it('should not throw an error for valid intervals', () => {
		expect(() => rejectInvalidIntervals(3, 'M')).not.toThrow();
		expect(() => rejectInvalidIntervals(5, 'P')).not.toThrow();
		expect(() => rejectInvalidIntervals(7, 'm')).not.toThrow();
		expect(() => rejectInvalidIntervals(12, 'aug')).not.toThrow();
	});

	it('should throw an error for invalid intervals', () => {
		expect(() => rejectInvalidIntervals(0, 'M')).toThrow(
			'Invalid interval: M0'
		);
		expect(() => rejectInvalidIntervals(3, 'P')).toThrow(
			'Invalid interval: P3'
		);
		expect(() => rejectInvalidIntervals(9, 'P')).toThrow(
			'Invalid interval: P9'
		);
		expect(() => rejectInvalidIntervals(15, 'M')).toThrow(
			'Invalid interval: M15'
		);
	});
});

describe('handleAliases', () => {
	it('should replace "A" with "aug"', () => {
		expect(handleAliases('A')).toBe('aug');
	});

	it('should replace "d" with "dim"', () => {
		expect(handleAliases('d')).toBe('dim');
	});

	it('should replace "maj" with "M"', () => {
		expect(handleAliases('maj')).toBe('M');
	});

	it('should replace "min" with "m"', () => {
		expect(handleAliases('min')).toBe('m');
	});

	it('should replace "perf" with "P"', () => {
		expect(handleAliases('perf')).toBe('P');
	});

	it('should not change other qualities', () => {
		expect(handleAliases('sus')).toBe('sus');
	});
});

describe('parse', () => {
	it('should parse intervals with quality and number', () => {
		const parsedInterval = parse('m3');
		expect(parsedInterval.toString()).toEqual(new Interval(3, 'm').toString());
	});

	it('should assume major or perfect if no quality given', () => {
		const parsedInterval = parse('5');
		expect(parsedInterval.toString()).toEqual(new Interval(5, 'P').toString());
	});

	it('should ignore non-digits in interval', () => {
		const parsedInterval = parse('m9+');
		expect(parsedInterval.toString()).toEqual(new Interval(9, 'm').toString());
	});

	it('should return the input interval if it is already an Interval object', () => {
		const inputInterval = new Interval(3, 'm');
		const parsedInterval = parse(inputInterval);
		expect(parsedInterval).toEqual(inputInterval);
	});
});

describe('Interval', () => {
	describe('constructor', () => {
		it('should create an Interval object with the correct properties', () => {
			const interval = new Interval(3, 'm');
			expect(interval.number).toEqual(3);
			expect(interval.quality).toEqual('m');
			expect(interval.name).toEqual('m3');
			expect(interval.fullName).toEqual('Minor Third');
		});

		it('should throw an error for invalid intervals', () => {
			expect(() => new Interval(0, 'M')).toThrow();
			expect(() => new Interval(10, 'P')).toThrow();
		});
	});

	describe('toString', () => {
		it('should return the correct interval name', () => {
			const interval1 = new Interval(2, 'M');
			const interval2 = new Interval(4, 'dim');
			const interval3 = new Interval(7, 'A');

			expect(interval1.toString()).toEqual('M2');
			expect(interval2.toString()).toEqual('dim4');
			expect(interval3.toString()).toEqual('aug7');
		});
	});
});

describe('invert', () => {
	it('should return the inverted interval', () => {
		const interval = new Interval(3, 'M');
		const inverted = interval.invert();

		expect(inverted.number).toEqual(6);
		expect(inverted.quality).toEqual('m');
	});

	it('should return the same interval for unison/octave', () => {
		const interval = new Interval(1, 'P');
		const inverted = interval.invert();

		expect(inverted.number).toEqual(1);
		expect(inverted.quality).toEqual('P');

		const interval2 = new Interval(8, 'P');
		const inverted2 = interval2.invert();

		expect(inverted2.number).toEqual(8);
		expect(inverted2.quality).toEqual('P');
	});
});

describe('halfSteps', () => {
	it('should return the correct number of half steps for a perfect interval', () => {
		const interval = new Interval(4, 'P');
		expect(interval.halfSteps()).toEqual(5);
	});

	it('should return the correct number of half steps for a major interval', () => {
		const interval = new Interval(3, 'M');
		expect(interval.halfSteps()).toEqual(4);
	});

	it('should return the correct number of half steps for a minor interval', () => {
		const interval = new Interval(6, 'm');
		expect(interval.halfSteps()).toEqual(8);
	});

	it('should return the correct number of half steps for an augmented interval', () => {
		const interval = new Interval(2, 'A');
		expect(interval.halfSteps()).toEqual(3);
	});

	it('should return the correct number of half steps for a diminished interval', () => {
		const interval = new Interval(7, 'd');
		expect(interval.halfSteps()).toEqual(9);
	});
});

describe('create', () => {
	test('should create interval object', () => {
		const interval = create(3, 'M');
		expect(interval.number).toBe(3);
		expect(interval.quality).toBe('M');
		expect(interval.name).toBe('M3');
		expect(interval.fullName).toBe('Major Third');
	});

	test('should handle aliases', () => {
		const interval = create(3, 'maj');
		expect(interval.quality).toBe('M');
	});

	test('should throw error for invalid intervals', () => {
		expect(() => create(0, 'M')).toThrow('Invalid interval: M0');
		expect(() => create(15, 'M')).toThrow('Invalid interval: M15');
		expect(() => create(4, 'm')).toThrow('Invalid interval: m4');
		expect(() => create(7, 'P')).toThrow('Invalid interval: P7');
	});
});
