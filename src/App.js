//https://github.com/tonaljs/tonal

import Header from './components/UI/Header';
import IntervalFromNotePage from './pages/intervals/IntervalFromNotePage';
import IntervalsFilters from './components/filters/IntervalsFilters';
import React from 'react';

function App() {
	return (
		<div className='w-screen h-screen'>
			<Header />
			<div className='w-full h-full grid grid-cols-5'>
				<div className='col-span-4'>
					<IntervalFromNotePage />
				</div>
				<div className='col-span-1 border-l-2'>
					<IntervalsFilters />
				</div>
			</div>
		</div>
	);
}
export default App;
