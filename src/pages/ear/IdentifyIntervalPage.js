import React, { useRef } from 'react';

import MIDISounds from 'midi-sounds-react';
import Midisoundsreact from 'midi-sounds-react';

const IdentifyIntervalPage = () => {
	const midRef = useRef();

	const HandleClick = () => {
		console.log('clicked');
		midRef.playChordNow(3, [60], 2.5);
		// MIDISounds.
	};

	return (
		<div>
			<div
				onClick={() => {
					HandleClick();
				}}>
				test
			</div>
			<Midisoundsreact ref={midRef} />
		</div>
	);
};

export default IdentifyIntervalPage;
