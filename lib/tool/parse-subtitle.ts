import { SubtitleItem } from "@/@types/project/subtitle-type";

export const parseSRT = (content: string): SubtitleItem[] => {
	const timeToSeconds = (timeString: string): number => {
		const [hours, minutes, seconds] = timeString.split(":");
		const [secs, ms] = seconds.split(",");
		return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(secs) + parseInt(ms) / 1000;
	};

	const contentTrim = content.trim();
	if (!contentTrim) {
		return [];
	}

	const lines = contentTrim.split("\n");
	const result: SubtitleItem[] = [];
	let currentSubtitle: Partial<SubtitleItem> = {};

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		if (line !== "" && !isNaN(Number(line))) {
			// This is a subtitle number
			if (Object.keys(currentSubtitle).length > 0) {
				result.push(currentSubtitle as SubtitleItem);
			}
			currentSubtitle = { line: parseInt(line) };
		} else if (line.includes("-->")) {
			// This is the timestamp line
			const [start, end] = line.split(" --> ");
			currentSubtitle.start = timeToSeconds(start);
			currentSubtitle.end = timeToSeconds(end);
		} else if (line !== "") {
			// This is the subtitle text
			currentSubtitle.text = currentSubtitle.text ? currentSubtitle.text + "\n" + line : line;
		}
	}

	// Push the last subtitle if it exists
	if (Object.keys(currentSubtitle).length > 0) {
		result.push(currentSubtitle as SubtitleItem);
	}

	return result;
};
export const parseVTT = (content: string): SubtitleItem[] => {
	const timeToSeconds = (time: string): number => {
		const [hours, minutes, secondsAndMilliseconds] = time.split(":");
		const [seconds, milliseconds] = secondsAndMilliseconds.split(".");
		return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10) + parseInt(milliseconds, 10) / 1000;
	};

	const contentTrim = content.trim();
	if (!contentTrim) {
		return [];
	}

	const lines = contentTrim.split("\n");
	const result: SubtitleItem[] = [];
	let currentSubtitle: Partial<SubtitleItem> = {};
	let isFirstLine = true;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		if (isFirstLine) {
			if (line === "WEBVTT") {
				isFirstLine = false;
				continue;
			} else {
				return []; // Invalid VTT file, must start with WEBVTT
			}
		}

		if (line === "") {
			if (Object.keys(currentSubtitle).length > 0) {
				result.push(currentSubtitle as SubtitleItem);
				currentSubtitle = {};
			}
			continue; // Skip empty lines
		}

		if (line.includes("-->")) {
			// This is the timestamp line
			const [start, end] = line.split(" --> ");
			currentSubtitle.start = timeToSeconds(start);
			currentSubtitle.end = timeToSeconds(end);
		} else if (!isNaN(Number(line))) {
			currentSubtitle.line = parseInt(line);
		} else {
			currentSubtitle.text = currentSubtitle.text ? currentSubtitle.text + "\n" + line : line;
		}
	}
	if (Object.keys(currentSubtitle).length > 0) {
		result.push(currentSubtitle as SubtitleItem);
	}

	return result;
};
