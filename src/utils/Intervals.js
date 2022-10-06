class interval {
	constructor(type, dist) {
		this.type = type;
		this.dist = dist;
	}
}

export const getNoteFromInterval = (startingNote, int) => {
	int = new interval('Major', 2);
	console.log(int);
	return int;
};
