import React, { useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

const SideMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	let iconStyle =
		'absolute right-4 top-4 text-4xl cursor-pointer hover:text-5xl transition-all z-10';

	return (
		<>
			{!isOpen ? (
				<GiHamburgerMenu
					onClick={() => {
						setIsOpen(true);
					}}
					className={iconStyle}
				/>
			) : (
				<AiOutlineClose
					onClick={() => {
						setIsOpen(false);
					}}
					className={iconStyle}
				/>
			)}
			<div
				className={`border-l-2 h-full  marginTop-[105px] right-0 ${
					isOpen ? 'w-[25vw]' : 'w-0'
				} ease-in-out duration-300`}>
				content
			</div>
		</>
	);
};

export default SideMenu;
