import { Metadata } from "next";
import { WEBNAME } from "@/lib/constants";
import FreeSubtitleEditorClient from "./subtitle-editor.client";

export const metadata: Metadata = {
	title: `${WEBNAME}`,
	alternates: {
		canonical: "/",
	},
};

export default async function Page() {
	return (
		<div className="flex h-screen w-full flex-col overflow-hidden">
			<FreeSubtitleEditorClient />
		</div>
	);
}
