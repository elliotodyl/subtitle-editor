import "./globals.css";
import { fontHeading, fontSans } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "next-client-cookies/server";
import NextTopLoader from "nextjs-toploader";
import { Metadata } from "next";
import { DOMAIN } from "@/lib/constants";

export const metadata: Metadata = {
	metadataBase: new URL(DOMAIN),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`font-sans ${fontHeading.variable} ${fontSans.variable}`}>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body>
				<NextTopLoader color="#000000E0" initialPosition={0.3} speed={600} crawlSpeed={200} showSpinner={false} shadow={false} />
				<CookiesProvider>
					{children}
					<Toaster richColors position="top-center" />
				</CookiesProvider>
			</body>
		</html>
	);
}
