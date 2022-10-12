import './Header.css';

import { createRef, useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

const items = [
	{
		name: 'Intervals',
		color: '#f44336',
		href: 'intervals',
	},
	{
		name: 'Fretboard',
		color: '#e91e63',
		href: 'fretboard',
	},
	{
		name: 'Scales',
		color: '#9c27b0',
		href: 'scales',
	},
	{
		name: 'Chords',
		color: '#673ab7',
		href: 'chords',
	},
	{
		name: 'Ear',
		color: '#3f51b5',
		href: 'ear',
	},
];

const Header = ({}) => {
	const location = useLocation();

	const $root = useRef();
	const $indicator1 = useRef();
	const $indicator2 = useRef();
	const $items = useRef(items.map(createRef));
	const [active, setActive] = useState(0);
	const [prevActive, setPrevActive] = useState(0);

	const animate = () => {
		const menuOffset = $root.current.getBoundingClientRect();
		const activeItem = $items.current[active].current;
		const { width, height, top, left } = activeItem.getBoundingClientRect();

		const settings = {
			x: left - menuOffset.x,
			y: top - menuOffset.y,
			width: width,
			height: height,
			backgroundColor: items[active].color,
			ease: 'elastic.out(.7, .7)',
			duration: 0.8,
		};

		gsap.to($indicator1.current, {
			...settings,
		});

		gsap.to($indicator2.current, {
			...settings,
			duration: 1,
		});
	};

	useEffect(() => {
		animate();
		window.addEventListener('resize', animate);

		return () => {
			window.removeEventListener('resize', animate);
		};
	}, [active]);

	useEffect(() => {
		let paths = ['/intervals', '/fretboard', '/scales', '/chords', '/ear'];
		setActive(paths.indexOf(location.pathname));
		setPrevActive(paths.indexOf(location.pathname));
	}, []);

	return (
		<div ref={$root} className='menu'>
			{items.map((item, index) => (
				<a
					key={item.name}
					ref={$items.current[index]}
					className={`item ${active === index ? 'active' : ''}`}
					onMouseEnter={() => {
						setActive(index);
					}}
					onMouseLeave={() => {
						setActive(prevActive);
					}}
					href={item.href}>
					{item.name}
				</a>
			))}
			<div ref={$indicator1} className='indicator' />
			<div ref={$indicator2} className='indicator' />
		</div>
	);
};

export default Header;
