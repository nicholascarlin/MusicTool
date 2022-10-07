import React, { useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

const SideMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{!isOpen ? (
				<GiHamburgerMenu
					onClick={() => {
						setIsOpen(true);
					}}
					className={
						'absolute right-4 top-4 text-4xl cursor-pointer hover:text-5xl transition-all z-10'
					}
				/>
			) : (
				<AiOutlineClose
					onClick={() => {
						setIsOpen(false);
					}}
					className={
						'absolute right-4 top-4 text-4xl cursor-pointer hover:text-5xl transition-all z-10 text-white'
					}
				/>
			)}
			<div
				className={`w-[25vw] h-full fixed top-[105px] right-0 bg-red-500 ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				} ease-in-out duration-300`}></div>
		</>
	);
};

export default SideMenu;
