/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				refresh: 'refresh 400ms linear',
			},
			keyframes: {
				refresh: {
					'0%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(180deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			gridTemplateColumns: {
				13: 'repeat(13, minmax(0, 1fr))',
			},
		},
	},
	plugins: [],
};
