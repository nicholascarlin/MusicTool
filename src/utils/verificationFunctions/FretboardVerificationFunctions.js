import { note } from '@tonaljs/core';

export const VerifyFretboardNote = (ans, resp) => {
	return note(ans).height === note(resp).height;
};
