"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const StachIconCloudCheck = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cn("size-4", className)} {...props}>
			<path
				fill="currentColor"
				d="M11 5.75c-2.674 0-4.881 2-5.208 4.584l-.059.464l-.443.151A3.752 3.752 0 0 0 6.5 18.25h11a3.75 3.75 0 1 0-.482-7.47l-.72.093l-.115-.717A5.25 5.25 0 0 0 11 5.75M4.376 9.698A6.752 6.752 0 0 1 17.52 9.25a5.25 5.25 0 0 1-.021 10.5h-11A5.25 5.25 0 0 1 4.376 9.698"
			/>
			<path
				fill="currentColor"
				d="M14.53 10.47a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L10 13.94l3.47-3.47a.75.75 0 0 1 1.06 0"
			/>
		</svg>
	);
};
export const IconoirIconRefresh = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cn("size-4", className)} {...props}>
			<g fill="none" stroke="currentColor" strokeWidth="1.5">
				<circle cx="12" cy="12" r="10" />
				<path strokeLinecap="round" strokeLinejoin="round" d="M16.583 9.667C15.81 8.097 14.043 7 11.988 7C9.388 7 7.25 8.754 7 11" />
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M14.494 9.722H16.4a.6.6 0 0 0 .6-.6V7.5m-9.583 6.167C8.191 15.629 9.957 17 12.012 17c2.6 0 4.736-2.193 4.988-5"
				/>
				<path strokeLinecap="round" strokeLinejoin="round" d="M9.506 13.622H7.6a.6.6 0 0 0-.6.6V16.4" />
			</g>
		</svg>
	);
};

export const ProIconsSubtitle = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} {...props}>
			<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
				<rect width="18.5" height="14.5" x="2.75" y="4.75" rx="4" />
				<path d="M10.5 14.382a2.75 2.75 0 1 1 0-4.764m7.125 4.764a2.75 2.75 0 1 1 0-4.764" />
			</g>
		</svg>
	);
};
export const ProIconsDocument = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} {...props} viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
				<rect width="15" height="18.5" x="4.5" y="2.75" rx="3.5" />
				<path d="M8.5 6.755h7m-7 4h7m-7 4H12" />
			</g>
		</svg>
	);
};

export const IconUpload = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#B7C0CD" className={cn("mx-auto w-14 text-gray-400 text-inherit", className)}>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				<path
					fill="currentColor"
					d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
				></path>
			</g>
		</svg>
	);
};

export const IconMusicFile = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		// <svg viewBox="-1.5 -1.5 18.00 18.00" xmlns="http://www.w3.org/2000/svg" className={cn("text-inherit", className)}>
		// 	<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
		// 	<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
		// 	<g id="SVGRepo_iconCarrier">
		// 		<path
		// 			d="M7 10C7 9.44771 6.55228 9 6 9C5.44772 9 5 9.44771 5 10C5 10.5523 5.44772 11 6 11C6.55228 11 7 10.5523 7 10Z"
		// 			fill="currentColor"
		// 		></path>
		// 		<path
		// 			fill="currentColor"
		// 			fillRule="evenodd"
		// 			clipRule="evenodd"
		// 			d="M1 1.5C1 0.671573 1.67157 0 2.5 0H10.7071L14 3.29289V13.5C14 14.3284 13.3284 15 12.5 15H2.5C1.67157 15 1 14.3284 1 13.5V1.5ZM7.34189 4.02569C7.54606 3.95763 7.77087 4.02786 7.9 4.20003L8.2 4.60003C8.86099 5.48135 9.89835 6.00003 11 6.00003V7.00003C9.88299 7.00003 8.8174 6.58529 8 5.8542V10C8 11.1046 7.10457 12 6 12C4.89543 12 4 11.1046 4 10C4 8.89543 4.89543 8 6 8C6.36429 8 6.70583 8.09739 7 8.26756V4.50003C7 4.28482 7.13772 4.09375 7.34189 4.02569Z"
		// 		></path>
		// 	</g>
		// </svg>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" className={cn("text-inherit", className)}>
			<path fill="currentColor" d="M7 10a1 1 0 1 0-2 0a1 1 0 0 0 2 0" />
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M1 1.5A1.5 1.5 0 0 1 2.5 0h8.207L14 3.293V13.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 13.5zm6.342 2.526A.5.5 0 0 1 7.9 4.2l.3.4A3.5 3.5 0 0 0 11 6v1a4.5 4.5 0 0 1-3-1.146V10a2 2 0 1 1-1-1.732V4.5a.5.5 0 0 1 .342-.474"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconTextDocFile = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" className={cn("text-inherit", className)}>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M1 1.5A1.5 1.5 0 0 1 2.5 0h8.207L14 3.293V13.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 13.5zm3 2.497L9 4v1l-5-.003zm7 2.998H4v1h7zm0 3.006l-7-.008v1L11 11z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconGoBack3 = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			className={cn("h-8 w-8 text-inherit", className)}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.47 1.415a.75.75 0 01.115 1.054l-.804 1.004a9.64 9.64 0 019.86 9.637 9.64 9.64 0 01-9.641 9.64 9.64 9.64 0 01-9.64-9.64c0-2.176.751-4.162 1.95-5.76a.75.75 0 111.2.9c-1.022 1.362-1.65 3.037-1.65 4.86A8.14 8.14 0 0012 21.25a8.14 8.14 0 008.14-8.14A8.14 8.14 0 0012 4.97c-.575 0-1.14.071-1.697.195a.75.75 0 01-1.033-.677.75.75 0 01.231-.57l1.914-2.387a.75.75 0 011.054-.116zm2.382 13.438c0 1.362-1.18 2.267-2.922 2.267-1.43 0-2.309-.619-2.662-1.357a1.127 1.127 0 01-.12-.494c0-.406.26-.66.692-.66.312 0 .51.124.665.41.265.525.67.837 1.45.837.77 0 1.3-.447 1.3-1.07.006-.729-.53-1.134-1.44-1.134h-.327c-.38 0-.598-.224-.598-.562 0-.328.218-.556.598-.556h.307c.785 0 1.294-.427 1.294-1.04 0-.603-.405-1.004-1.164-1.004-.635 0-1.02.265-1.264.796-.171.353-.354.483-.707.483-.437 0-.66-.254-.66-.634 0-.177.036-.328.114-.504.333-.733 1.186-1.347 2.511-1.347 1.586 0 2.657.785 2.657 1.986 0 .952-.68 1.576-1.565 1.758v.03c1.118.105 1.841.76 1.841 1.795z"
			></path>
		</svg>
	);
};

export const IconGoForward3 = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			className={cn("h-8 w-8 text-inherit", className)}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.53 1.415a.75.75 0 011.055.116L14.5 3.919c.145.14.231.337.23.545a.749.749 0 01-1.033.7A7.825 7.825 0 0012 4.97a8.14 8.14 0 100 16.28 8.14 8.14 0 008.14-8.14c0-1.823-.629-3.498-1.65-4.86a.75.75 0 111.2-.9c1.198 1.598 1.95 3.584 1.95 5.76A9.64 9.64 0 0112 22.75a9.64 9.64 0 01-9.64-9.64 9.64 9.64 0 019.86-9.637l-.805-1.004a.75.75 0 01.116-1.054zm3.322 13.438c0 1.362-1.18 2.267-2.922 2.267-1.43 0-2.309-.619-2.662-1.357a1.127 1.127 0 01-.12-.494c0-.406.26-.66.692-.66.312 0 .51.124.665.41.265.525.67.837 1.45.837.77 0 1.3-.447 1.3-1.07.006-.729-.53-1.134-1.44-1.134h-.327c-.38 0-.598-.224-.598-.562 0-.328.218-.556.598-.556h.307c.785 0 1.294-.427 1.294-1.04 0-.603-.405-1.004-1.164-1.004-.635 0-1.02.265-1.264.796-.171.353-.354.483-.707.483-.437 0-.66-.254-.66-.634 0-.177.036-.328.114-.504.333-.733 1.186-1.347 2.511-1.347 1.586 0 2.657.785 2.657 1.986 0 .952-.68 1.576-1.565 1.758v.03c1.118.105 1.841.76 1.841 1.795z"
			></path>
		</svg>
	);
};

export const IconRowPlusTop = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" className={cn("h-8 w-8 text-inherit", className)}>
			<path
				fill="#000000"
				d="M208 160H48a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-24a16 16 0 0 0-16-16m0 40H48v-24h160zm0-112H48a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-24a16 16 0 0 0-16-16m0 40H48v-24h160zM96 40a8 8 0 0 1 8-8h16V16a8 8 0 0 1 16 0v16h16a8 8 0 0 1 0 16h-16v16a8 8 0 0 1-16 0V48h-16a8 8 0 0 1-8-8"
			/>
		</svg>
	);
};

export const IconRowPlusBottom = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" className={cn("h-8 w-8 text-inherit", className)}>
			<path
				fill="#000000"
				d="M208 112H48a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-24a16 16 0 0 0-16-16m0 40H48v-24h160zm0-112H48a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 40H48V56h160zm-48 136a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0v-16h-16a8 8 0 0 1 0-16h16v-16a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8"
			/>
		</svg>
	);
};

export const IconStarCircle = ({ className, ...props }: ComponentProps<"svg">) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={cn("h-8 w-8 text-inherit", className)}>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M10.861 9.363l-.13.235c-.145.259-.217.388-.329.473s-.252.117-.532.18l-.254.058c-.984.222-1.476.334-1.593.71c-.117.377.218.769.889 1.553l.174.203c.19.223.285.334.328.472s.029.287 0 .584l-.026.27c-.102 1.047-.152 1.57.154 1.803s.767.02 1.688-.403l.239-.11c.261-.12.392-.181.531-.181s.27.06.531.18l.239.11c.92.425 1.382.637 1.688.404s.256-.756.154-1.802l-.026-.271c-.029-.297-.043-.446 0-.584s.138-.25.328-.472l.174-.203c.67-.784 1.006-1.176.889-1.553c-.117-.376-.609-.488-1.593-.71l-.254-.058c-.28-.063-.42-.095-.532-.18s-.184-.214-.328-.473l-.131-.235C12.632 8.454 12.379 8 12 8s-.632.454-1.139 1.363"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const LogoUS = ({ className }: { className?: string }) => {
	return (
		// <svg
		// 	xmlns="http://www.w3.org/2000/svg"
		// 	shapeRendering="geometricPrecision"
		// 	textRendering="geometricPrecision"
		// 	imageRendering="optimizeQuality"
		// 	fillRule="evenodd"
		// 	clipRule="evenodd"
		// 	viewBox="0 0 512 512"
		// 	className={className}
		// >
		// 	<rect fill="#CC9B7A" width="512" height="512" rx="104.187" ry="105.042" />
		// 	<path
		// 		fill="#1F1F1E"
		// 		fillRule="nonzero"
		// 		d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"
		// 	/>
		// </svg>
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 512">
			<mask id="IconifyId195085577f173d4b72">
				<circle cx="256" cy="256" r="256" fill="#fff" />
			</mask>
			<g mask="url(#IconifyId195085577f173d4b72)">
				<path fill="#eee" d="M256 0h256v64l-32 32l32 32v64l-32 32l32 32v64l-32 32l32 32v64l-256 32L0 448v-64l32-32l-32-32v-64z" />
				<path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z" />
				<path fill="#0052b4" d="M0 0h256v256H0Z" />
				<path
					fill="#eee"
					d="m187 243l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67zm162-81l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Zm162-82l57-41h-70l57 41l-22-67Zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Z"
				/>
			</g>
		</svg>
	);
};
export const LogoES = ({ className }: { className?: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 512">
			<mask id="IconifyId195085577f173d4b7511">
				<circle cx="256" cy="256" r="256" fill="#fff" />
			</mask>
			<g mask="url(#IconifyId195085577f173d4b7511)">
				<path fill="#ffda44" d="m0 128l256-32l256 32v256l-256 32L0 384Z" />
				<path fill="#d80027" d="M0 0h512v128H0zm0 384h512v128H0z" />
				<g fill="#eee">
					<path d="M144 304h-16v-80h16zm128 0h16v-80h-16z" />
					<ellipse cx="208" cy="296" rx="48" ry="32" />
				</g>
				<g fill="#d80027">
					<rect width="16" height="24" x="128" y="192" rx="8" />
					<rect width="16" height="24" x="272" y="192" rx="8" />
					<path d="M208 272v24a24 24 0 0 0 24 24a24 24 0 0 0 24-24v-24h-24z" />
				</g>
				<rect width="32" height="16" x="120" y="208" fill="#ff9811" ry="8" />
				<rect width="32" height="16" x="264" y="208" fill="#ff9811" ry="8" />
				<rect width="32" height="16" x="120" y="304" fill="#ff9811" rx="8" />
				<rect width="32" height="16" x="264" y="304" fill="#ff9811" rx="8" />
				<path fill="#ff9811" d="M160 272v24c0 8 4 14 9 19l5-6l5 10a21 21 0 0 0 10 0l5-10l5 6c6-5 9-11 9-19v-24h-9l-5 8l-5-8h-10l-5 8l-5-8z" />
				<path
					fill="#d80027"
					d="M122 248a4 4 0 0 0-4 4a4 4 0 0 0 4 4h172a4 4 0 0 0 4-4a4 4 0 0 0-4-4zm0 24a4 4 0 0 0-4 4a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4a4 4 0 0 0-4-4zm144 0a4 4 0 0 0-4 4a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4a4 4 0 0 0-4-4z"
				/>
				<path
					fill="#eee"
					d="M196 168c-7 0-13 5-15 11l-5-1c-9 0-16 7-16 16s7 16 16 16c7 0 13-4 15-11a16 16 0 0 0 17-4a16 16 0 0 0 17 4a16 16 0 1 0 10-20a16 16 0 0 0-27-5q-4.5-6-12-6m0 8c5 0 8 4 8 8c0 5-3 8-8 8c-4 0-8-3-8-8c0-4 4-8 8-8m24 0c5 0 8 4 8 8c0 5-3 8-8 8c-4 0-8-3-8-8c0-4 4-8 8-8m-44 10l4 1l4 8c0 4-4 7-8 7s-8-3-8-8c0-4 4-8 8-8m64 0c5 0 8 4 8 8c0 5-3 8-8 8c-4 0-8-3-8-7l4-8z"
				/>
				<path fill="none" d="M220 284v12c0 7 5 12 12 12s12-5 12-12v-12z" />
				<path fill="#ff9811" d="M200 160h16v32h-16z" />
				<path fill="#eee" d="M208 224h48v48h-48z" />
				<path fill="#d80027" d="m248 208l-8 8h-64l-8-8c0-13 18-24 40-24s40 11 40 24m-88 16h48v48h-48z" />
				<rect width="20" height="32" x="222" y="232" fill="#d80027" rx="10" ry="10" />
				<path fill="#ff9811" d="M168 232v8h8v16h-8v8h32v-8h-8v-16h8v-8zm8-16h64v8h-64z" />
				<g fill="#ffda44">
					<circle cx="186" cy="202" r="6" />
					<circle cx="208" cy="202" r="6" />
					<circle cx="230" cy="202" r="6" />
				</g>
				<path fill="#d80027" d="M169 272v43a24 24 0 0 0 10 4v-47zm20 0v47a24 24 0 0 0 10-4v-43z" />
				<g fill="#338af3">
					<circle cx="208" cy="272" r="16" />
					<rect width="32" height="16" x="264" y="320" ry="8" />
					<rect width="32" height="16" x="120" y="320" ry="8" />
				</g>
			</g>
		</svg>
	);
};
export const LogoFR = ({ className }: { className?: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 512">
			<mask id="IconifyId195085577f173d4b7515">
				<circle cx="256" cy="256" r="256" fill="#fff" />
			</mask>
			<g mask="url(#IconifyId195085577f173d4b7515)">
				<path fill="#eee" d="M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z" />
				<path fill="#0052b4" d="M0 0h167v512H0z" />
				<path fill="#d80027" d="M345 0h167v512H345z" />
			</g>
		</svg>
	);
};
export const LogoDE = ({ className }: { className?: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 512">
			<mask id="IconifyId195085577f173d4b7517">
				<circle cx="256" cy="256" r="256" fill="#fff" />
			</mask>
			<g mask="url(#IconifyId195085577f173d4b7517)">
				<path fill="#ffda44" d="m0 345l256.7-25.5L512 345v167H0z" />
				<path fill="#d80027" d="m0 167l255-23l257 23v178H0z" />
				<path fill="#333" d="M0 0h512v167H0z" />
			</g>
		</svg>
	);
};
export const LogoJP = ({ className }: { className?: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 512">
			<mask id="IconifyId195085577f173d4b7519">
				<circle cx="256" cy="256" r="256" fill="#fff" />
			</mask>
			<g mask="url(#IconifyId195085577f173d4b7519)">
				<path fill="#eee" d="M0 0h512v512H0z" />
				<circle cx="256" cy="256" r="111.3" fill="#d80027" />
			</g>
		</svg>
	);
};
