import React, { useEffect, useState } from 'react';

const ChordFilters = ({ SetChordProgression }) => {
	const [input1, setInput1] = useState(0);
	const [input2, setInput2] = useState(0);
	const [input3, setInput3] = useState(0);
	const [input4, setInput4] = useState(0);

	useEffect(() => {
		let tempArr = [input1, input2, input3, input4];
		SetChordProgression(tempArr);
	}, [input1, input2, input3, input4]);

	const inputStyle = 'border p-2 rounded-xl';

	return (
		<>
			<div className='-mt-14 mb-8 underline text-lg'>Chord Filters</div>
			<div className='w-full ml-6'>Select Chord Progression:</div>
			<div className='fc-center md:fr-center gap-4 mt-4 w-full px-4'>
				<select
					onChange={(e) => {
						setInput1(e.target.value);
					}}
					className={inputStyle}>
					<option value={0}>-</option>
					<option value={'I'}>I</option>
					<option value={'ii'}>ii</option>
					<option value={'iii'}>iii</option>
					<option value={'IV'}>IV</option>
					<option value={'V'}>V</option>
					<option value={'vi'}>vi</option>
					<option value={'vii'}>vii</option>
				</select>
				<select
					onChange={(e) => {
						setInput2(e.target.value);
					}}
					className={inputStyle}>
					<option value={0}>-</option>
					<option value={'I'}>I</option>
					<option value={'ii'}>ii</option>
					<option value={'iii'}>iii</option>
					<option value={'IV'}>IV</option>
					<option value={'V'}>V</option>
					<option value={'vi'}>vi</option>
					<option value={'vii'}>vii</option>
				</select>
				<select
					onChange={(e) => {
						setInput3(e.target.value);
					}}
					className={inputStyle}>
					<option value={0}>-</option>
					<option value={'I'}>I</option>
					<option value={'ii'}>ii</option>
					<option value={'iii'}>iii</option>
					<option value={'IV'}>IV</option>
					<option value={'V'}>V</option>
					<option value={'vi'}>vi</option>
					<option value={'vii'}>vii</option>
				</select>
				<select
					onChange={(e) => {
						setInput4(e.target.value);
					}}
					className={inputStyle}>
					<option value={0}>-</option>
					<option value={'I'}>I</option>
					<option value={'ii'}>ii</option>
					<option value={'iii'}>iii</option>
					<option value={'IV'}>IV</option>
					<option value={'V'}>V</option>
					<option value={'vi'}>vi</option>
					<option value={'vii'}>vii</option>
				</select>
			</div>
		</>
	);
};

export default ChordFilters;
