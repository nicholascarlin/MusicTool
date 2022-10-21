//https://github.com/tonaljs/tonal

// TODO: Make get note one function so dont need to pass acxtive note to all

import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AccidentalSelector from './components/UI/AccidentalSelector';
import ChordsProgressionFromRoman from './pages/ChordProgressionFromRoman';
import ComingSoonPage from './pages/ComingSoonPage';
import Fretboard from './components/fretboard/Fretboard';
import Header from './components/UI/Header';
import IntervalFromNotePage from './pages/intervals/IntervalFromNotePage';
import NoteFromIntervalPage from './pages/intervals/NoteFromIntervalPage';
import NoteSelector from './components/UI/NoteSelector';
import SideMenu from './components/UI/SideMenu';

function App() {
	const [isSharp, setSharpStatus] = useState(true);
	const [selectedNote, setSelectedNote] = useState(null);
	const [activeSubTask, setActiveSubTask] = useState('0');
	const [isLoaded, setLoadingStatus] = useState(false);

	const SetActiveSubTask = (value) => {
		setActiveSubTask(value);
	};

	useEffect(() => {
		setLoadingStatus(paths.includes(window.location.pathname));
	}, [window.location.pathname]);

	let paths = ['/intervals', '/fretboard', '/scales', '/chords', '/ear'];

	return (
		<Router>
			<div className='w-screen h-screen'>
				{isLoaded ? <Header /> : null}
				<div className='w-full h-[calc(100vh-105px)] overflow-hidden relative fr-full'>
					{window.location.pathname === '/intervals' ||
					window.location.pathname === '/chords' ? (
						<>
							<AccidentalSelector SetStatus={setSharpStatus} />
							<NoteSelector
								ActiveNote={selectedNote}
								SetStatus={setSelectedNote}
								IsSharp={isSharp}
							/>
						</>
					) : null}
					<div className='fc-center-full-full mt-40'>
						<Routes>
							{/* INTERVAL ROUTE */}
							<Route path='*' element={<Navigate to='/intervals' replace />} />
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
							<Route path='/fretboard' element={<ComingSoonPage />} />
							<Route path='/scales' element={<ComingSoonPage />} />
							<Route
								path='/chords'
								element={
									<ChordsProgressionFromRoman
										IsSharp={isSharp}
										ActiveNote={selectedNote}
									/>
								}
							/>
							<Route path='/ear' element={<ComingSoonPage />} />
						</Routes>
					</div>
					{window.location.pathname === '/intervals' ||
					window.location.pathname === '/chords' ? (
						<SideMenu SetActiveSubTask={SetActiveSubTask} />
					) : null}
				</div>
			</div>
		</Router>
	);
}
export default App;
