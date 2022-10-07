//https://github.com/tonaljs/tonal

import React, { useState } from 'react';

import Header from './components/UI/Header';
import IntervalFromNotePage from './pages/intervals/IntervalFromNotePage';
import IntervalsFilters from './components/filters/IntervalsFilters';
import SideMenu from './components/UI/SideMenu';

function App() {
	return (
		<div className='w-screen h-screen'>
			<Header />
			<div className='w-full h-[calc(100vh-105px)] overflow-hidden relative fr-full'>
				<IntervalFromNotePage />
				<SideMenu />
			</div>
		</div>
	);
}
export default App;
