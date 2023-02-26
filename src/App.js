//https://github.com/tonaljs/tonal
// https://github.com/jsrmath/sharp11 - NEED TO INSTALL, Good for chord ear recognition, scale degree

// TODO: Make get note one function so dont need to pass acxtive note to all

import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AboutPage from './pages/AboutPage';
import AccidentalSelector from './components/UI/AccidentalSelector';
import ChordsProgressionFromRoman from './pages/chords/ChordProgressionFromRoman';
import ComingSoonPage from './pages/ComingSoonPage';
import EarIntervalFromNotesPage from './pages/ear/EarIntervalFromNotesPage';
import EarScaleDegreeFromNote from './pages/ear/EarScaleDegreeFromNote';
import Fretboard from './components/fretboard/Fretboard';
import FretboardPage from './pages/fretboard/FretboardPage';
import Header from './components/UI/Header';
import IntervalFromNotePage from './pages/intervals/IntervalFromNotePage';
import NoteFromIntervalPage from './pages/intervals/NoteFromIntervalPage';
import NoteSelector from './components/UI/NoteSelector';
import SideMenu from './components/UI/SideMenu';

function App() {
	const navigate = useNavigate();

	const [isSharp, setSharpStatus] = useState(true);
	const [selectedNote, setSelectedNote] = useState(null);
	const [activeSubTask, setActiveSubTask] = useState('0');
	const [isLoaded, setLoadingStatus] = useState(false);
	const [chordProgression, setChordProgression] = useState([0, 0, 0, 0]);

	// Chords

	const SetActiveSubTask = (value) => {
		setActiveSubTask(value);
	};

	useEffect(() => {
		setLoadingStatus(paths.includes(window.location.pathname));
	}, [window.location.pathname]);

	let paths = [
		'/intervals',
		'/fretboard',
		'/scales',
		'/chords',
		'/ear',
		'/about',
	];

	return (
		<div className='w-screen h-screen'>
			{isLoaded ? <Header /> : null}
			{/* TODO: MEdia Query and just load Mobile HEader component, gonna be so much easier */}
			<div className='w-full h-[calc(100vh-105px)] overflow-hidden relative fr-full'>
				<div className='fc-center-full-full'>
					{window.location.pathname === '/intervals' ||
					window.location.pathname === '/chords' ||
					window.location.pathname === '/ear' ||
					window.location.pathname === '/fretboard' ? (
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
							<Routes>
								{/* INTERVAL ROUTE */}
								<Route
									path='*'
									element={<Navigate to='/intervals' replace />}
								/>
								<Route
									path='/intervals'
									element={
										activeSubTask === '0' ? (
											<IntervalFromNotePage
												ActiveNote={selectedNote}
												IsSharp={isSharp}
											/>
										) : activeSubTask === '1' ? (
											<NoteFromIntervalPage
												ActiveNote={selectedNote}
												IsSharp={isSharp}
											/>
										) : null
									}
								/>
								<Route
									path='/fretboard'
									element={<FretboardPage IsSharp={isSharp} />}
								/>
								<Route path='/scales' element={<ComingSoonPage />} />
								<Route
									path='/chords'
									element={
										<ChordsProgressionFromRoman
											IsSharp={isSharp}
											ActiveNote={selectedNote}
											ActiveChordProgression={chordProgression}
										/>
									}
								/>
								<Route
									path='/ear'
									element={
										activeSubTask === '0' ? (
											<EarIntervalFromNotesPage
												ActiveNote={selectedNote}
												IsSharp={isSharp}
											/>
										) : activeSubTask === '1' ? (
											<EarScaleDegreeFromNote
												ActiveNote={selectedNote}
												IsSharp={isSharp}
											/>
										) : null
									}
								/>
								<Route path='/about' element={<AboutPage />} />
							</Routes>
						</div>
						{window.location.pathname === '/intervals' ||
						window.location.pathname === '/chords' ||
						window.location.pathname === '/ear' ? (
							<SideMenu
								SetActiveSubTask={SetActiveSubTask}
								SetChordProgression={setChordProgression}
								ChordProgression={chordProgression}
							/>
						) : null}
					</div>
				</div>

				<div
					onClick={() => {
						navigate('/about');
					}}
					className='hidden md:block absolute bottom-0 left-0 py-4 pl-6 pr-8 rounded-tr-xl cursor-pointer border border-purple-400 hover:bg-purple-400 transition-all duration-300'>
					About
				</div>
			</div>
		</div>
	);
}
export default App;
