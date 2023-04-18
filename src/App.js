//https://github.com/tonaljs/tonal
// https://github.com/jsrmath/sharp11 - NEED TO INSTALL, Good for chord ear recognition, scale degree

// TODO: Make get note one function so dont need to pass acxtive note to all

import React, { useState } from 'react';
import {
	shouldRenderAccidentalSelector,
	shouldRenderNoteSelector,
} from './utils/routing/RouteHelperFunctions';

import AccidentalSelector from './components/UI/AccidentalSelector';
import AppRoutes from './pages/RouteHandlers';
import Header from './components/UI/Header';
import NoteSelector from './components/UI/NoteSelector';
import SideMenu from './components/UI/SideMenu';

function App() {
	const [isSharp, setSharpStatus] = useState(true);
	const [selectedNote, setSelectedNote] = useState(null);

	const [chordProgression, setChordProgression] = useState([0, 0, 0, 0]);

	return (
		<div className='w-screen h-screen'>
			<Header />
			{/* TODO: Media Query and just load Mobile HEader component, gonna be so much easier */}
			<div className='w-full h-[calc(100vh-105px)] overflow-hidden relative fr-full'>
				<div className='fc-center-full-full'>
					<div className='fr-center-between-full max-md:bg-red-500'>
						{shouldRenderAccidentalSelector() && (
							<AccidentalSelector SetStatus={setSharpStatus} />
						)}

						{shouldRenderNoteSelector() && (
							<NoteSelector
								ActiveNote={selectedNote}
								SetStatus={setSelectedNote}
								IsSharp={isSharp}
							/>
						)}
					</div>

					<div className='fr-center-full'>
						<div className='fc-center-full-full mt-40'>
							<AppRoutes
								IsSharp={isSharp}
								ActiveNote={selectedNote}
								ActiveChordProgression={chordProgression}
							/>
						</div>
						{/* {window.location.pathname.includes('/intervals') ||
						window.location.pathname.includes('/chords') ||
						window.location.pathname.includes('/ear') ? (
							<SideMenu
								SetActiveSubTask={SetActiveSubTask}
								SetChordProgression={setChordProgression}
								ChordProgression={chordProgression}
							/>
						) : null} */}
					</div>
				</div>
			</div>
		</div>
	);
}
export default App;
