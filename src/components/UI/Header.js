import { AiFillCaretLeft } from 'react-icons/ai';
import React from 'react';

const Header = () => {
	let headerItem = 'bg-gray-300 p-4 rounded-xl inline-flex items-center';
	let headerIcon = 'ml-2';

	return (
		<div className='container mx-auto bg-gray-200 rounded-xl shadow border p-8 fr-center-around-full'>
			<div className={headerItem}>
				Intervals <AiFillCaretLeft className={headerIcon} />
			</div>
			<div className={headerItem}>
				Fretboard <AiFillCaretLeft className={headerIcon} />
			</div>
			<div className={headerItem}>
				Scales <AiFillCaretLeft className={headerIcon} />
			</div>
			<div className={headerItem}>
				Chords <AiFillCaretLeft className={headerIcon} />
			</div>
			<div className={headerItem}>
				Ear <AiFillCaretLeft className={headerIcon} />
			</div>
		</div>
	);
};

export default Header;
