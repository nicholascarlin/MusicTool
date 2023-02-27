import { Note } from '@tonaljs/tonal';
import { areArraysSame } from '../Arrays';

export const VerifyChordProgressionFromRoman = (ans, resp) => {
	resp = resp.split(',');
	resp = resp.map(function (el) {
		return el.trim();
	});

	resp = resp.map(function (el) {
		return Note.simplify(el);
	});
	ans = ans.map(function (el) {
		return Note.simplify(el);
	});

	return areArraysSame(resp, ans);
};
