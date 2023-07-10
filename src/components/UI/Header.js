import { useEffect, useState } from 'react';

import { AiFillCaretLeft } from 'react-icons/ai';
import { GiGuitarHead } from 'react-icons/gi';

export const NavHeaderObjects = [
	{
		name: 'Intervals',
		color: 'text-[#f44336]',
		href: 'intervals',
		isReady: true,
		subItems: [
			{
				name: 'Determine Interval from Notes',
				href: 'intervals/interval-from-notes',
			},
			{
				name: 'Determine Note from Interval',
				href: 'intervals/note-from-interval',
			},
		],
	},
	{
		name: 'Fretboard',
		color: 'text-[#e91e63]',
		href: 'fretboard',
		isReady: true,
	},
	{
		name: 'Scales',
		color: 'text-[#9c27b0]',
		href: 'scales',
		isReady: false,
	},
	{
		name: 'Chords',
		color: 'text-[#673ab7]',
		href: 'chords',
		isReady: true,
	},
	{
		name: 'Ear',
		color: 'text-[#3f51b5]',
		href: 'ear',
		isReady: true,
		subItems: [
			{
				name: 'Determine Interval from Notes',
				href: 'ear/interval-from-notes',
			},
			{
				name: 'Determine Scale Degree',
				href: 'ear/determine-scale-degree',
			},
			{
				name: 'Chord Type Identification',
				href: 'ear/chord-type-identification',
			},
		],
	},
];

const Header = () => {
	const [activeHeaderItem, activeHeaderIndex] = useState(0);
	const [activeDropDown, setActiveDropDown] = useState(false);

	useEffect(() => {
		let paths = ['/intervals', '/fretboard', '/scales', '/chords', '/ear'];

		const currentPath = window.location.pathname.split('/')[1];

		if (currentPath !== 'about') {
			console.log('INDEX', paths.indexOf(`/${currentPath}`));
			activeHeaderIndex(paths.indexOf(`/${currentPath}`));
		} else {
			activeHeaderIndex(0);
		}
		console.log('LOCATION', window.location.pathname);
	}, []);

	const HandlePrimaryItemClick = (e, item, index) => {
		if (item.subItems) {
			e.preventDefault();
			if (activeDropDown && activeDropDown.index === index) {
				//Dropdown is currently selected
				setActiveDropDown(null);
			} else {
				setActiveDropDown({ index: index, subItems: item.subItems });
			}
		} else {
			//Does not have subItems
			window.location.pathname = item.href;
			setActiveDropDown(null);
		}
	};

	const HandleSubItemClick = (e, subItem) => {
		e.preventDefault();
		window.location.pathname = subItem.href;
		setActiveDropDown(null);
	};

	return (
		<div className='w-full border-b grid grid-cols-3 p-4 py-3 items-center'>
			<div
				className='flex items-center gap-2 text-gray-400 w-fit cursor-pointer'
				onClick={() => (window.location.pathname = '/home')}>
				<div>Guitar</div>
				<GiGuitarHead className='text-2xl' />
				<div>Theory</div>
			</div>
			<div className='flex mx-auto gap-20 self-center relative'>
				{NavHeaderObjects.map((navHeaderItem, navHeaderIdx) => {
					return (
						<div
							onClick={(e) => {
								HandlePrimaryItemClick(e, navHeaderItem, navHeaderIdx);
							}}>
							<div className='flex items-center'>
								<div
									className={`transition-all peer duration-300 hover:underline ${
										navHeaderItem.color
									} cursor-pointer ${
										navHeaderIdx === activeHeaderItem
											? 'underline font-bold'
											: ''
									}`}>
									{navHeaderItem.name}
								</div>
								{navHeaderItem.subItems ? (
									<AiFillCaretLeft
										className={`${
											activeDropDown?.index === navHeaderIdx
												? 'opacity-100 -rotate-90'
												: 'opacity-0'
										} transition-all duration-300 text-gray-400 ml-0.5 peer-hover:opacity-100`}
									/>
								) : null}
							</div>
						</div>
					);
				})}
				{activeDropDown ? (
					<div className='absolute z-50 top-8 left-0 right-0 bg-white border rounded-xl'>
						<div className='divide-y'>
							{activeDropDown?.subItems?.map((subItem, subIdx) => {
								return (
									<div
										onClick={(e) => HandleSubItemClick(e, subItem)}
										className='cursor-pointer hover:bg-gray-200 first:rounded-t-xl last:rounded-b-xl transition-all duration-200'>
										<div className='p-2'>{subItem.name}</div>
									</div>
								);
							})}
						</div>
					</div>
				) : null}
			</div>
			<div className='text-right flex justify-end'>
				<div className='hover:border-purple-500 hover:text-purple-500 border-gray-400 text-gray-400 transition-all duration-300 cursor-pointer rounded-full border p-2 px-6'>
					About
				</div>
			</div>
		</div>
	);
};

export default Header;
