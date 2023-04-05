export const shouldRenderNoteSelector = () => {
	const { pathname } = window.location;
	console.log('Pathname Note Selector', pathname);
	return (
		pathname.includes('/intervals') ||
		pathname.includes('/chords') ||
		pathname.includes('/ear') ||
		pathname.includes('/fretboard')
	);
};

export const shouldRenderAccidentalSelector = () => {
	const { pathname } = window.location;
	console.log('Pathname Accidental', pathname);
	return (
		pathname.includes('/intervals') ||
		pathname.includes('/chords') ||
		pathname.includes('/ear')
	);
};

export const determineActiveRoute = () => {};
