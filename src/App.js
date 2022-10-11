//https://github.com/tonaljs/tonal

import React, { useState } from 'react';

import AccidentalSelector from './components/UI/AccidentalSelector';
import Header from './components/UI/Header';
import IntervalFromNotePage from './pages/intervals/IntervalFromNotePage';
import NoteSelector from './components/UI/NoteSelector';
import SideMenu from './components/UI/SideMenu';

function App() {
	const [isSharp, setSharpStatus] = useState(true);
	const [selectedNote, setSelectedNote] = useState(null);

	return (
		<div className='w-screen h-screen'>
			<Header />
			<div className='w-full h-[calc(100vh-105px)] overflow-hidden relative fr-full'>
				<AccidentalSelector SetStatus={setSharpStatus} />
				<NoteSelector
					ActiveNote={selectedNote}
					SetStatus={setSelectedNote}
					IsSharp={isSharp}
				/>
				<IntervalFromNotePage ActiveNote={selectedNote} IsSharp={isSharp} />
				<SideMenu />
			</div>
		</div>
	);
}
export default App;
