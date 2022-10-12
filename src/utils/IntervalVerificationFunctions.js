export const VerifyIntervals = (resp, answer) => {
	resp = [...resp];
	answer = [...answer];

	resp = resp.map(function (x) {
		if (x === 'd' || x === 'p') {
			return x.toUpperCase();
		} else {
			return x;
		}
	});

	answer = answer.map(function (x) {
		if (x === 'd' || x === 'p') {
			return x.toUpperCase();
		} else {
			return x;
		}
	});

	return resp.every((item) => answer.includes(item));
};

export const VerifyNoteFromInterval = (resp, answer) => {
	console.log('REPSP', resp);
	console.log('ANS', answer);
	console.log(resp === answer);
	return resp === answer;
};
