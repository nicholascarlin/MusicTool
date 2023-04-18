import { AiFillSetting, AiOutlineClose } from 'react-icons/ai';
import React, { useState } from 'react';

const SideMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	let iconStyle =
		'absolute right-4 top-4 text-4xl cursor-pointer hover:text-5xl transition-all text-gray-500';

	return (
		<>
			{!isOpen ? (
				<AiFillSetting
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
				className={`border-l-2 h-full  marginTop-[105px] right-0 fc-center pt-20 ${
					isOpen ? 'w-[25vw]' : 'w-0'
				} ease-in-out duration-300`}></div>
		</>
	);
};

export default SideMenu;
