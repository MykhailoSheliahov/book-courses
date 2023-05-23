type time = number | string;

export const getCoursesDuration = (duration: number) => {
	let h: time = Math.floor(duration / 60);
	let m: time = duration % 60;
	const hText = h === 1 || h === 0 ? ' hour' : ' hours';
	const hLabel = h >= 0 ? hText : '';

	if (h < 10) {
		h = '0' + h;
	}

	if (m < 10) {
		m = '0' + m;
	}

	return `${h}:${m} ${hLabel}`;
};
