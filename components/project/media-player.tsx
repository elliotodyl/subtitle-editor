import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import {
	MediaController,
	MediaControlBar,
	MediaTimeRange,
	MediaTimeDisplay,
	MediaVolumeRange,
	MediaPlayButton,
	MediaSeekBackwardButton,
	MediaSeekForwardButton,
	MediaLoadingIndicator,
} from "media-chrome/react";
import { useMediaRef } from "media-chrome/react/media-store";

interface MediaPlayerProps {
	activeSubtitle: any | null;
	isMulti: boolean;
	fileUrl?: string;
}

export default function MediaPlayer({ activeSubtitle, isMulti, fileUrl }: MediaPlayerProps) {
	const mediaRef = useMediaRef();

	const [mediaUrl, setMediaUrl] = useState<string | null>(null);

	const [mediaIsAudio, setMediaIsAudio] = useState(false);

	useEffect(() => {
		if (fileUrl) {
			setMediaUrl(fileUrl);
		}
	}, []);

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const fileType = file.type;
		// console.log("fileType:", fileType);
		if (fileType.startsWith("audio/")) {
			setMediaIsAudio(true);
		} else {
			setMediaIsAudio(false);
		}

		const url = URL.createObjectURL(file);
		setMediaUrl(url);
	};
	useEffect(() => {
		return () => {
			if (mediaUrl) {
				URL.revokeObjectURL(mediaUrl);
			}
		};
	}, [mediaUrl]);

	return (
		<div className="space-y-4">
			{mediaUrl ? (
				<div className="relative">
					<MediaController className="aspect-video w-full">
						<video ref={mediaRef} slot="media" src={mediaUrl} preload="auto" playsInline crossOrigin="" />
						<MediaLoadingIndicator slot="centered-chrome"></MediaLoadingIndicator>
						<MediaControlBar className="w-full bg-black">
							<MediaPlayButton></MediaPlayButton>
							<MediaSeekBackwardButton seekOffset={10}></MediaSeekBackwardButton>
							<MediaSeekForwardButton seekOffset={10}></MediaSeekForwardButton>
							<MediaTimeRange></MediaTimeRange>
							<MediaTimeDisplay showDuration noToggle></MediaTimeDisplay>
							<MediaVolumeRange></MediaVolumeRange>
						</MediaControlBar>
					</MediaController>

					<div className="absolute bottom-12 flex w-full flex-col justify-center px-2 text-white">
						<div
							className="mx-auto text-pretty bg-[#14141E]/70 p-1 text-center text-sm md:text-base lg:text-lg"
							style={{
								visibility: activeSubtitle ? "visible" : "hidden",
							}}
						>
							{activeSubtitle?.text}
						</div>
						{isMulti && (
							<div
								className="mx-auto text-pretty bg-[#14141E]/70 p-1 text-center"
								style={{
									fontSize: "16px",
									visibility: activeSubtitle ? "visible" : "hidden",
								}}
							>
								{activeSubtitle?.translation}
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="text-center">
					<label htmlFor="file-upload" className="cursor-pointer">
						<div className="flex aspect-video flex-col items-center justify-center space-y-2 rounded-lg border-2 border-dashed p-8 transition-colors duration-500 hover:border-primary">
							<Upload className="h-12 w-12 text-gray-400" />
							<span className="text-sm font-medium text-gray-600">Choose a file</span>
							<span className="text-xs text-gray-400">Supports audio and video files</span>
						</div>
						<input id="file-upload" type="file" accept="audio/*,video/*" onChange={handleFileSelect} className="hidden" />
					</label>
				</div>
			)}
		</div>
	);
}
