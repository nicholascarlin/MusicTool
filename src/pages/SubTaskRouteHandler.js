import IntervalFromNotePage from './intervals/IntervalFromNotePage';
import NoteFromIntervalPage from './intervals/NoteFromIntervalPage';

export const HandleIntervalSubTask = (activeSubTask, IsSharp, ActiveNote) => {
	switch (activeSubTask) {
		case '0':
			return <IntervalFromNotePage ActiveNote={ActiveNote} IsSharp={IsSharp} />;

		case '1':
			return <NoteFromIntervalPage ActiveNote={ActiveNote} IsSharp={IsSharp} />;

		default:
			console.log(
				'HandleIntervalSubTask: Invalid activeSubTask',
				activeSubTask
			);
			return null;
	}
};

// export const HandleFretboardSubTask = () => {

// }

// export const HandleScalesSubTask = () => {

// }

// export const HandleChordSubTask = () => {

// }

// export const HandleEarSubTask = () => {

// }
