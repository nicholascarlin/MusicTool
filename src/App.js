import Header from './components/UI/Header';
import React from 'react';
import { getNoteFromInterval } from './utils/Intervals';

function App() {
	return (
		<div className='w-screen h-screen p-4'>
			<Header />
			<div>test2</div>
			<button
				onClick={() => {
					getNoteFromInterval('A', 2);
				}}>
				test
			</button>
		</div>
	);
}
export default App;
