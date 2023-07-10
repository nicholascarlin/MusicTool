import { Navigate, Route, Routes } from 'react-router-dom';

import AboutPage from './AboutPage';
import ChordsProgressionFromRoman from './chords/ChordProgressionFromRoman';
import ComingSoonPage from './ComingSoonPage';
import EarChordTypeIdentification from './ear/EarChordTypeIdentification';
import EarIntervalFromNotesPage from './ear/EarIntervalFromNotesPage';
import EarScaleDegreeFromNote from './ear/EarScaleDegreeFromNote';
import FretboardPage from './fretboard/FretboardPage';
import HomePage from './HomePage';
import IntervalFromNotePage from './intervals/IntervalFromNotePage';
import NoteFromIntervalPage from './intervals/NoteFromIntervalPage';

const IntervalRoutes = ({ selectedNote, isSharp }) => {
	const intervalRoutes = [
		{
			path: 'interval-from-notes',
			element: (
				<IntervalFromNotePage ActiveNote={selectedNote} IsSharp={isSharp} />
			),
		},
		{
			path: 'note-from-interval',
			element: (
				<NoteFromIntervalPage ActiveNote={selectedNote} IsSharp={isSharp} />
			),
		},
	];

	return (
		<Routes>
			{intervalRoutes.map(({ path, element }) => (
				<Route key={path} path={path} element={element} />
			))}
		</Routes>
	);
};

const EarRoutes = ({ selectedNote, isSharp }) => {
	const earRoutes = [
		{
			path: 'interval-from-notes',
			element: (
				<EarIntervalFromNotesPage ActiveNote={selectedNote} IsSharp={isSharp} />
			),
		},
		{
			path: 'determine-scale-degree',
			element: (
				<EarScaleDegreeFromNote ActiveNote={selectedNote} IsSharp={isSharp} />
			),
		},
		{
			path: 'chord-type-identification',
			element: <EarChordTypeIdentification />,
		},
	];

	return (
		<Routes>
			{earRoutes.map(({ path, element }) => (
				<Route key={path} path={path} element={element} />
			))}
		</Routes>
	);
};

const AppRoutes = ({ IsSharp, ActiveNote, ChordProgression }) => {
	return (
		<Routes>
			<Route
				path='intervals/*'
				element={<IntervalRoutes isSharp={IsSharp} selectedNote={ActiveNote} />}
			/>
			<Route path='/fretboard' element={<FretboardPage IsSharp={IsSharp} />} />
			<Route path='/scales' element={<ComingSoonPage />} />
			<Route
				path='/chords'
				element={
					<ChordsProgressionFromRoman
						IsSharp={IsSharp}
						ActiveNote={ActiveNote}
						ActiveChordProgression={ChordProgression}
					/>
				}
			/>
			<Route
				path='ear/*'
				element={<EarRoutes isSharp={IsSharp} selectedNote={ActiveNote} />}
			/>
			<Route path='/about' element={<AboutPage />} />
			<Route path='*' element={<Navigate to='/about' replace />} />
			<Route path='/home' element={<HomePage />} />
		</Routes>
	);
};

export default AppRoutes;
