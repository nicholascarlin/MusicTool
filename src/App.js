//https://github.com/tonaljs/tonal

// TODO: Make get note one function so dont need to pass acxtive note to all

import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AccidentalSelector from './components/UI/AccidentalSelector';
import Header from './components/UI/Header';
import IntervalFromNotePage from './pages/intervals/IntervalFromNotePage';
import NoteFromIntervalPage from './pages/intervals/NoteFromIntervalPage';
import NoteSelector from './components/UI/NoteSelector';
import SideMenu from './components/UI/SideMenu';

function App() {
	const [isSharp, setSharpStatus] = useState(true);
	const [selectedNote, setSelectedNote] = useState(null);
	const [activeSubTask, setActiveSubTask] = useState('0');

	const test = (value) => {
		console.log('CHANGED', value);
		setActiveSubTask(value);
	};

	return (
		<Router>
			<div className='w-screen h-screen'>
				<Header />
				<div className='w-full h-[calc(100vh-105px)] overflow-hidden relative fr-full'>
					<AccidentalSelector SetStatus={setSharpStatus} />
					<NoteSelector
						ActiveNote={selectedNote}
						SetStatus={setSelectedNote}
						IsSharp={isSharp}
					/>
					<div className='fc-center-full-full mt-40'>
						<Routes>
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
								}></Route>
						</Routes>
					</div>
					<SideMenu SetActiveSubTask={test} />
				</div>
			</div>
		</Router>
	);
}
export default App;
