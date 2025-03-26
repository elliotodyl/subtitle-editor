"use client";

import { useCallback, useRef, useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, getNanoId } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SubtitleType } from "@/@types/project/subtitle-type";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportToFile } from "@/lib/file/save-to-file";
import { NoPrefetchLink } from "@/components/ui/no-prefetch-link";
import { parseSRT, parseVTT } from "@/lib/tool/parse-subtitle";
import { MediaProvider } from "media-chrome/react/media-store";
import MediaPlayer from "@/components/project/media-player";
import ProjectSubtitleClient from "@/components/project/project-subtitle.client";

export default function FreeSubtitleEditorClient() {
	const [isSelectedFile, setIsSelectedFile] = useState<boolean>(false);
	const [matchedSubtitles, setMatchedSubtitles] = useState<any[]>([]);
	const [activeIndexAndSubtitle, setActiveIndexAndSubtitle] = useState<{ index: number; subtitle: any } | null>(null);

	// export
	const [exportFileType, setExportFileType] = useState<string>("srt");

	//upload srt file
	const srtFileInputRef = useRef<HTMLInputElement>(null);
	const handleSRTFileSelectClick = useCallback(() => {
		srtFileInputRef.current?.click();
	}, []);
	const handleFileSRTSelect = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;
			const extension = file.name.split(".").pop()?.toLowerCase();

			const reader = new FileReader();
			reader.onload = async (e: ProgressEvent<FileReader>) => {
				const content = e.target?.result;
				if (typeof content !== "string") {
					return;
				}

				let parsedJson: any[] = [];
				switch (extension) {
					case "srt":
						parsedJson = parseSRT(content);
						break;
					case "vtt":
						parsedJson = parseVTT(content);
						break;
					default:
						break;
				}

				const newSubtitles: SubtitleType[] = [];
				for (let i = 0; i < parsedJson.length; i++) {
					newSubtitles.push({
						id: getNanoId(11),
						start: parsedJson[i].start,
						end: parsedJson[i].end,
						text: parsedJson[i].text,
					});
				}
				console.log(newSubtitles);

				setMatchedSubtitles(newSubtitles);

				setIsSelectedFile(true);
			};
			reader.readAsText(file);
		},
		[setMatchedSubtitles, setIsSelectedFile],
	);

	if (!isSelectedFile) {
		return (
			<div className="h-screen w-full">
				<div className="container mx-auto flex h-full w-full flex-col items-center justify-center">
					<div className="w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg">
						<div className="w-full pb-6">
							<p className="text-xl font-medium text-gray-900">Free Online Subtitle Editor</p>
						</div>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-3">
								<Label className="text-sm font-normal text-primary">Select your SRT or VTT file</Label>
								<div onClick={handleSRTFileSelectClick} className="">
									<Button variant="outline" className="mx-auto">
										<CirclePlus className="" />
										Select
									</Button>
									<input ref={srtFileInputRef} type="file" accept=".srt,.vtt" onChange={handleFileSRTSelect} className="hidden" />
								</div>
							</div>

							<div className="align-center mt-5 flex flex-row items-center text-center text-[#979797]">
								<div className="flex w-full border-t border-solid border-gray-200 dark:border-gray-800"></div>
								<div className="mx-3 flex whitespace-nowrap text-gray-700 dark:text-gray-200">
									<span className="text-[13px] text-[#979797]">OR</span>
								</div>
								<div className="flex w-full border-t border-solid border-gray-200 dark:border-gray-800"></div>
							</div>
							<Button
								variant="secondary"
								className="mx-auto"
								onClick={() => {
									setMatchedSubtitles([{ id: getNanoId(11), start: 0, end: 10, text: "" }]);
									setIsSelectedFile(true);
								}}
							>
								Create subtitles manually
							</Button>
							<NoPrefetchLink href="https://subtitlegen.com" target="_blank" className={cn(buttonVariants(), "mx-auto")}>
								Auto-subtitle your video on SubtitleGen
							</NoPrefetchLink>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="sticky top-0 z-20 w-full border-b bg-background px-6">
				<div className="mx-auto flex h-[56px] flex-wrap items-center gap-1">
					<div className="flex w-full flex-row items-center justify-between gap-1">
						<div className="flex w-full flex-row items-center gap-1">
							<Button
								variant="outline"
								onClick={() => {
									setIsSelectedFile(false);
									setMatchedSubtitles([]);
								}}
							>
								New subtitles
							</Button>
						</div>

						<Dialog>
							<DialogTrigger asChild>
								<Button className="rounded-full">Export</Button>
							</DialogTrigger>
							<DialogContent className="max-w-md gap-0 rounded-lg bg-white p-0 shadow-lg">
								<DialogHeader className="p-6">
									<DialogTitle className="text-xl font-medium text-gray-900">Download file</DialogTitle>
								</DialogHeader>
								<div className="flex flex-col gap-6 px-6">
									<div className="flex flex-col gap-3">
										<Label className="text-sm font-normal text-primary">File format</Label>
										<Select value={exportFileType} defaultValue="srt" onValueChange={(e) => setExportFileType(e)}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="File format" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="srt" className="cursor-pointer">
													SubRip (.srt)
												</SelectItem>
												<SelectItem value="vtt" className="cursor-pointer">
													WebVTT (.vtt)
												</SelectItem>
												<SelectItem value="ass" className="cursor-pointer">
													Advanced SubStation Alpha (.ass)
												</SelectItem>
												<SelectItem value="txt" className="cursor-pointer">
													Text (.txt)
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<DialogFooter className="px-6 py-6">
									<Button
										className="w-full"
										onClick={() => {
											if (matchedSubtitles.length === 0) return;
											exportToFile({
												type: exportFileType,
												content: matchedSubtitles,
												title: getNanoId(11),
												languageType: "0",
											});
										}}
									>
										Download
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>

			<div className="mx-auto flex h-full w-full flex-row overflow-hidden">
				<MediaProvider>
					<div className="flex h-full w-1/2 min-w-[384px] flex-shrink-0 flex-col border-r">
						<ScrollArea>
							<div className="p-4 md:p-6">
								<div className="mx-auto w-full flex-row rounded-lg bg-gray-50 p-1 shadow-sm">
									<MediaPlayer activeSubtitle={activeIndexAndSubtitle?.subtitle} isMulti={false} />
								</div>
							</div>
						</ScrollArea>
					</div>

					<div className="flex h-full w-1/2 flex-col">
						<div className="flex w-full flex-col gap-2 overflow-y-auto">
							<div className="flex w-full flex-col p-4">
								<ProjectSubtitleClient
									matchedSubtitles={matchedSubtitles}
									setMatchedSubtitles={setMatchedSubtitles}
									activeSubtitle={activeIndexAndSubtitle}
									setActiveSubtitle={setActiveIndexAndSubtitle}
								/>
							</div>
						</div>
					</div>
				</MediaProvider>
			</div>
		</>
	);
}
