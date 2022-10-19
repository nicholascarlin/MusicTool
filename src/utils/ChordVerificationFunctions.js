import { areArraysSame } from './Arrays';

export const VerifyChordProgressionFromRoman = (ans, resp) => {
	resp = resp.split(',');
	resp = resp.map(function (el) {
		return el.trim();
	});
	console.log('RESP', resp);
	console.log('ANS', ans);
	return areArraysSame(resp, ans);
};
