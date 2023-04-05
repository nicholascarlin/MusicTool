//https://github.com/tonaljs/tonal
// https://github.com/jsrmath/sharp11 - NEED TO INSTALL, Good for chord ear recognition, scale degree

// TODO: Make get note one function so dont need to pass acxtive note to all

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import AboutPage from './pages/AboutPage';
import AccidentalSelector from './components/UI/AccidentalSelector';
import AppRoutes from './pages/RouteHandlers';
import ChordsProgressionFromRoman from './pages/chords/ChordProgressionFromRoman';
import ComingSoonPage from './pages/ComingSoonPage';
import EarChordTypeIdentification from './pages/ear/EarChordTypeIdentification';
import EarIntervalFromNotesPage from './pages/ear/EarIntervalFromNotesPage';
import EarScaleDegreeFromNote from './pages/ear/EarScaleDegreeFromNote';
import FretboardPage from './pages/fretboard/FretboardPage';
import Header from './components/UI/Header';
import IntervalFromNotePage from './pages/intervals/IntervalFromNotePage';
import NoteFromIntervalPage from './pages/intervals/NoteFromIntervalPage';
import NoteSelector from './components/UI/NoteSelector';
import SideMenu from './components/UI/SideMenu';

function App() {
	const [isSharp, setSharpStatus] = useState(true);
	const [selectedNote, setSelectedNote] = useState(null);
	const [activeSubTask, setActiveSubTask] = useState('0');
	const [chordProgression, setChordProgression] = useState([0, 0, 0, 0]);

	// Chords

	const SetActiveSubTask = (value) => {
		setActiveSubTask(value);
	};

	return (
		<div className='w-screen h-screen'>
			<Header />
			{/* TODO: MEdia Query and just load Mobile HEader component, gonna be so much easier */}
			<div className='w-full h-[calc(100vh-105px)] overflow-hidden relative fr-full'>
				<div className='fc-center-full-full'>
					{window.location.pathname.includes('/intervals') ||
					window.location.pathname.includes('/chords') ||
					window.location.pathname.includes('/ear') ||
					window.location.pathname.includes('/fretboard') ? (
						<div className='fr-center-between-full max-md:bg-red-500'>
							<AccidentalSelector SetStatus={setSharpStatus} />

							{window.location.pathname !== '/fretboard' ? (
								<NoteSelector
									ActiveNote={selectedNote}
									SetStatus={setSelectedNote}
									IsSharp={isSharp}
								/>
							) : (
								<></>
							)}
							<div className='w-[calc(4.5rem)]'></div>
						</div>
					) : null}
					<div className='fr-center-full'>
						<div className='fc-center-full-full mt-40'>
							<AppRoutes
								IsSharp={isSharp}
								ActiveNote={selectedNote}
								ActiveChordProgression={chordProgression}
							/>
						</div>
						{window.location.pathname.includes('/intervals') ||
						window.location.pathname.includes('/chords') ||
						window.location.pathname.includes('/ear') ? (
							<SideMenu
								SetActiveSubTask={SetActiveSubTask}
								SetChordProgression={setChordProgression}
								ChordProgression={chordProgression}
							/>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
export default App;
