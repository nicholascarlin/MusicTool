import { NavHeaderObjects } from '../components/UI/Header';
import React from 'react';

const HomePage = () => {
	return (
		<div className='w-full -mt-16 p-2'>
			<div className='text-2xl font-semibold'>Practice Guitar Theory</div>
			{NavHeaderObjects.map((item) => {
				return (
					<div>
						<div className='font-semibold p-4'>{item.name}</div>
						<hr />
						{item?.subItems
							? item.subItems.map((subItem) => {
									return (
										<div className='p-8'>
											<div>{subItem.name}</div>
										</div>
									);
							  })
							: null}
					</div>
				);
			})}
		</div>
	);
};

export default HomePage;
