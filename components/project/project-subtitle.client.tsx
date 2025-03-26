import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Check, Trash2, Scissors, ChevronsDown, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getNanoId } from "@/lib/utils";
import { SubtitleType } from "@/@types/project/subtitle-type";
import { Input } from "@/components/ui/input";
import { formatTime } from "@/lib/utils-date";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MediaActionTypes, useMediaDispatch, useMediaSelector } from "media-chrome/react/media-store";

const secondsToTime = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const remainingSecondsAfterHours = seconds % 3600;
	const minutes = Math.floor(remainingSecondsAfterHours / 60);
	const remainingSeconds = Math.floor(remainingSecondsAfterHours % 60);
	const milliseconds = Math.round((seconds % 1) * 1000);
	return { hours, minutes, seconds: remainingSeconds, milliseconds };
};
const timeToSeconds = (time: { hours: number; minutes: number; seconds: number; milliseconds: number }) => {
	return time.hours * 3600 + time.minutes * 60 + time.seconds + time.milliseconds / 1000;
};

export interface TranslatedSubtitleType extends SubtitleType {
	translation?: string;
}

function binarySearchSubtitle(subtitles: any[], currentTime: number | null | undefined): { index: number; subtitle: any } | null {
	if (!currentTime) {
		return null;
	}
	let low = 0;
	let high = subtitles.length - 1;

	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const subtitle = subtitles[mid];

		if (currentTime >= subtitle.start && currentTime < subtitle.end) {
			return { index: mid, subtitle };
		}

		if (currentTime < subtitle.start) {
			high = mid - 1;
		} else {
			low = mid + 1;
		}
	}

	return null;
}

export default function ProjectSubtitleClient({
	matchedSubtitles,
	setMatchedSubtitles,
	activeSubtitle,
	setActiveSubtitle,
}: {
	matchedSubtitles: any[];
	setMatchedSubtitles: Dispatch<SetStateAction<any[]>>;
	activeSubtitle: {
		index: number;
		subtitle: any;
	} | null;
	setActiveSubtitle: Dispatch<
		SetStateAction<{
			index: number;
			subtitle: any;
		} | null>
	>;
}) {
	const originalTextRef = useRef<string>("");
	const [editingState, setEditingState] = useState<{
		index: number;
		id: string;
		text: string;
		isSource: boolean;
	} | null>(null);
	const handleEditStart = (subtitle: any, index: number, isSource: boolean = true) => {
		setEditingState({
			index,
			id: subtitle.id,
			text: isSource ? subtitle.text ?? "" : subtitle.translation ?? "",
			isSource,
		});
		originalTextRef.current = isSource ? subtitle.text ?? "" : subtitle.translation ?? "";
	};
	const handleEditBlur = (text: string, isSource: boolean, subtitle: any) => {
		const originalText = originalTextRef.current;

		if (originalText !== text) {
			setMatchedSubtitles((prev) =>
				prev.map((sub) =>
					sub.id === subtitle.id
						? {
								...sub,
								[isSource ? "text" : "translation"]: text,
							}
						: sub,
				),
			);
		}
		setEditingState(null);
	};
	const handleInsertSubtitle = async (index: number) => {
		const startTime = matchedSubtitles[index].start;
		const endTime = matchedSubtitles[index].end;
		const text = matchedSubtitles[index].text;

		const newId = getNanoId(11);
		let newSubtitle: any = {
			id: newId,
			start: startTime,
			end: endTime,
			text: text,
		};
		originalTextRef.current = "";
		const insertIndex = index + 1;
		setMatchedSubtitles((prev) => [...prev.slice(0, insertIndex), newSubtitle, ...prev.slice(insertIndex)]);
		setEditingState(null);
	};

	//编辑字幕:删除
	const handleDeleteSubtitle = async (id: string) => {
		setMatchedSubtitles((prev) => prev.filter((sub) => sub.id !== id));
		setEditingState(null);
		originalTextRef.current = "";
	};
	const handleMergeSubtitle = async (index: number) => {
		if (index === matchedSubtitles.length - 1) {
			return;
		}
		const subtitle1 = matchedSubtitles[index];
		const subtitle2 = matchedSubtitles[index + 1];
		let startTime = subtitle1.start;
		let endTime = subtitle2.end;

		const subtitle1Text = subtitle1.text ?? "";
		const subtitle2Text = subtitle2.text ?? "";

		const text = subtitle1Text + " " + subtitle2Text;

		let mergeSubtitle: any = {
			id: getNanoId(11),
			start: startTime,
			end: endTime,
			text: text.trim(),
		};
		setMatchedSubtitles((prev) => prev.map((sub) => (sub.id === subtitle1.id ? mergeSubtitle : sub)));
		setMatchedSubtitles((prev) => prev.filter((sub) => sub.id !== subtitle2.id));
	};

	const [editingTimeId, setEditingTimeId] = useState<string | null>(null);
	const [editingStartTime, setEditingStartTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
	const [editingEndTime, setEditingEndTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
	const timeEditRef = useRef<HTMLDivElement>(null);
	const handleTimeEditStart = useCallback((line: any) => {
		setEditingTimeId(line.id);
		setEditingStartTime(secondsToTime(line.start));
		setEditingEndTime(secondsToTime(line.end));
	}, []);
	const handleTimeChange = useCallback((isStart: boolean, field: "hours" | "minutes" | "seconds" | "milliseconds", value: number) => {
		if (isStart) {
			setEditingStartTime((prev) => ({ ...prev, [field]: value }));
		} else {
			setEditingEndTime((prev) => ({ ...prev, [field]: value }));
		}
	}, []);
	const handleTimeSubmit = useCallback(
		async (lineId: string) => {
			const newStartTime = timeToSeconds(editingStartTime);
			const newEndTime = timeToSeconds(editingEndTime);
			setMatchedSubtitles((prev) => prev.map((sub) => (sub.id === lineId ? { ...sub, start: newStartTime, end: newEndTime } : sub)));
			setEditingTimeId(null);
		},
		[editingStartTime, editingEndTime, setMatchedSubtitles],
	);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (timeEditRef.current && !timeEditRef.current.contains(event.target as Node)) {
				setEditingTimeId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [editingTimeId]);

	const dispatch = useMediaDispatch();
	const mediaCurrentTime = useMediaSelector((state) => state.mediaCurrentTime);

	useEffect(() => {
		if (mediaCurrentTime !== undefined && activeSubtitle) {
			if (mediaCurrentTime >= activeSubtitle.subtitle.start && mediaCurrentTime < activeSubtitle.subtitle.end) {
				return;
			}
		}
		const subtitleWithIndex = binarySearchSubtitle(matchedSubtitles, mediaCurrentTime);
		if (subtitleWithIndex !== null) {
			setActiveSubtitle(subtitleWithIndex);
		} else {
			setActiveSubtitle(null);
		}
	}, [mediaCurrentTime, matchedSubtitles]);

	const parentRef = useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: matchedSubtitles.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 108,
		overscan: 5,
	});

	return (
		<div className="flex w-full flex-col p-4">
			<div
				ref={parentRef}
				style={{
					height: `100%`,
					width: `100%`,
				}}
			>
				<div
					style={{
						height: `${virtualizer.getTotalSize()}px`,
						width: "100%",
						position: "relative",
					}}
				>
					{virtualizer.getVirtualItems().map((virtualRow, index) => {
						const line = matchedSubtitles[virtualRow.index];
						const isEditing = editingState?.id === line.id;

						return (
							<div
								key={virtualRow.key}
								data-index={virtualRow.index}
								ref={virtualizer.measureElement}
								className="absolute left-0 top-0 w-full pb-3"
								style={{
									transform: `translateY(${virtualRow.start}px)`,
								}}
							>
								<div className={cn("flex w-full flex-col rounded-md border", activeSubtitle?.index === index && "bg-neutral-100")}>
									{editingTimeId === line.id && (
										<div ref={timeEditRef} className="absolute z-10 flex items-center gap-1 rounded-md border bg-white p-2 shadow-lg">
											<Input
												type="text"
												inputMode="numeric"
												maxLength={2}
												value={editingStartTime.hours.toString()}
												onChange={(e) => {
													const newValue = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
													if (!isNaN(newValue)) {
														handleTimeChange(true, "hours", Math.min(newValue, 10));
													}
												}}
												className="h-8 w-9 px-1 text-center"
											/>
											<span>:</span>
											<Input
												type="text"
												inputMode="numeric"
												value={editingStartTime.minutes.toString()}
												onChange={(e) => {
													const newValue = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
													if (!isNaN(newValue)) {
														handleTimeChange(true, "minutes", Math.min(newValue, 59));
													}
												}}
												className="h-8 w-9 px-1 text-center"
											/>
											<span>:</span>
											<Input
												type="text"
												inputMode="numeric"
												value={editingStartTime.seconds.toString()}
												onChange={(e) => {
													const newValue = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
													if (!isNaN(newValue)) {
														handleTimeChange(true, "seconds", Math.min(newValue, 59));
													}
												}}
												className="h-8 w-9 px-1 text-center"
											/>
											<span>.</span>
											<Input
												type="text"
												inputMode="numeric"
												pattern="^[0-9]{1,3}$"
												value={editingStartTime.milliseconds.toString()}
												onChange={(e) => {
													const newValue = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
													if (!isNaN(newValue)) {
														handleTimeChange(true, "milliseconds", Math.min(newValue, 999));
													}
												}}
												className="h-8 w-9 px-1 text-center"
											/>
											<span> - </span>
											<Input
												type="text"
												inputMode="numeric"
												value={editingEndTime.hours.toString()}
												onChange={(e) => {
													const newValue = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
													if (!isNaN(newValue)) {
														handleTimeChange(false, "hours", Math.min(newValue, 10));
													}
												}}
												className="h-8 w-9 px-1 text-center"
											/>
											<span>:</span>
											<Input
												type="text"
												inputMode="numeric"
												value={editingEndTime.minutes.toString()}
												onChange={(e) => {
													const newValue = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
													if (!isNaN(newValue)) {
														handleTimeChange(false, "minutes", Math.min(newValue, 59));
													}
												}}
												className="h-8 w-9 px-1 text-center"
											/>
											<span>:</span>
											<Input
												type="text"
												inputMode="numeric"
												value={editingEndTime.seconds.toString()}
												onChange={(e) => {
													const newValue = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
													if (!isNaN(newValue)) {
														handleTimeChange(false, "seconds", Math.min(newValue, 59));
													}
												}}
												className="h-8 w-9 px-1 text-center"
											/>
											<span>.</span>
											<Input
												type="text"
												inputMode="numeric"
												value={editingEndTime.milliseconds.toString()}
												onChange={(e) => {
													const newValue = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
													if (!isNaN(newValue)) {
														handleTimeChange(false, "milliseconds", Math.min(newValue, 999));
													}
												}}
												className="h-8 w-9 px-1 text-center"
											/>
											<Button
												size="icon"
												variant="secondary"
												onClick={(e) => {
													handleTimeSubmit(line.id);
												}}
												className="ml-1 h-8 w-8"
											>
												<Check className="h-5 w-5" />
											</Button>
										</div>
									)}

									<div className="flex flex-row items-center justify-between gap-1 px-2 pt-2 text-muted-foreground">
										<div className="flex flex-row items-center gap-1 text-sm text-muted-foreground">
											<div className="cursor-pointer rounded-sm border px-2 py-0.5 text-sm" onClick={() => handleTimeEditStart(line)}>
												{formatTime(line.start)}
											</div>
											<MoveRight className="h-3.5 w-3.5" />
											<div className="cursor-pointer rounded-sm border px-2 py-0.5 text-sm" onClick={() => handleTimeEditStart(line)}>
												{formatTime(line.end)}
											</div>
										</div>
										<div className="flex flex-row items-center gap-1 text-sm text-muted-foreground">
											<button
												className="flex cursor-pointer flex-row items-center rounded-sm border px-1 py-0.5 hover:bg-muted"
												onClick={() => handleInsertSubtitle(index)}
											>
												<Scissors className="h-3.5 w-3.5" />
												<span className="hidden text-xs lg:block">Split</span>
											</button>

											<button
												className="flex cursor-pointer flex-row items-center rounded-sm border px-1 py-0.5 hover:bg-muted"
												onClick={() => handleMergeSubtitle(index)}
											>
												<ChevronsDown className="h-3.5 w-3.5" />
												<span className="hidden text-xs lg:block">Merge</span>
											</button>

											<button
												className="flex cursor-pointer flex-row items-center rounded-sm border border-red-300 bg-red-50 px-1 py-0.5 text-red-600 hover:bg-red-100 hover:text-red-500"
												onClick={() => handleDeleteSubtitle(line.id)}
											>
												<Trash2 className="h-3.5 w-3.5" />
											</button>
										</div>
									</div>

									<div
										className="relative w-full flex-1 rounded-sm px-2 pb-1 pt-2"
										onClick={() => {
											setActiveSubtitle({ index: index, subtitle: line });
											dispatch({ type: MediaActionTypes.MEDIA_SEEK_REQUEST, detail: line.start });
											dispatch({ type: MediaActionTypes.MEDIA_PLAY_REQUEST });
										}}
									>
										<textarea
											key={`${line.id}-source-true`}
											className="w-full resize-none whitespace-pre-wrap rounded-sm border bg-transparent py-1 pl-2 pr-4 focus:bg-white focus:outline-black focus:ring-0 focus:ring-primary"
											rows={2}
											maxLength={120}
											onFocus={(e) => handleEditStart(line, index)}
											onBlur={(e) => handleEditBlur(e.target.value, true, line)}
											defaultValue={isEditing && editingState?.isSource ? editingState?.text : line.text}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
