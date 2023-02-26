export const GetRandomAudioOctave = () => {
	return Math.floor(Math.random() * (3 - 2 + 1)) + 2;
};

/**
 *
 * @param {String} note
 * @param {int} octave
 * @returns Audio Object
 */
export const NoteToAudio = (note, octave) => {
	if (note.accidental === '#') {
		return note.letter + '-' + octave + '.mp3';
	}

	if (note.accidental === 'b') {
		return note.letter + 'b' + octave + '.mp3';
	}

	return note.letter + octave + '.mp3';
};
