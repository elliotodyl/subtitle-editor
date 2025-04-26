export function secondsToTimestampSRT(timeInSeconds: number): string {
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = Math.floor(timeInSeconds % 60);
	const milliseconds = Math.round((timeInSeconds % 1) * 1000);

	const formattedHours = String(hours).padStart(2, "0");
	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(seconds).padStart(2, "0");
	const formattedMilliseconds = String(milliseconds).padStart(3, "0");

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds},${formattedMilliseconds}`;
}

export function secondsToTimestampVTT(timeInSeconds: number): string {
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = Math.floor(timeInSeconds % 60);
	const milliseconds = Math.round((timeInSeconds % 1) * 1000);

	const formattedHours = String(hours).padStart(2, "0");
	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(seconds).padStart(2, "0");
	const formattedMilliseconds = String(milliseconds).padStart(3, "0");

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

export const formatTime = (seconds: number | null | undefined, includeMilliseconds = true): string => {
	if (!seconds) {
		return "00:00:00.000";
	}

	const hours = Math.floor(seconds / 3600);
	const remainingSecondsAfterHours = seconds % 3600;
	const minutes = Math.floor(remainingSecondsAfterHours / 60);
	const remainingSeconds = remainingSecondsAfterHours % 60;
	const formattedMinutes = String(minutes).padStart(2, "0");

	const formattedHours = String(hours).padStart(2, "0");
	if (includeMilliseconds) {
		const formattedSeconds = remainingSeconds.toFixed(3).padStart(6, "0");
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	}
	return `${formattedHours}:${formattedMinutes}:${String(Math.floor(remainingSeconds)).padStart(2, "0")}`;
};
