import { type NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import { i18nConfig } from "./i18n-config";

export async function middleware(request: NextRequest) {
	return i18nRouter(request, i18nConfig);
}

export const config = {
	matcher: ["/((?!api|static|_next|js|images|video|locales|fonts|favicon.ico|robots.txt|sitemap.xml|privacy-policy|terms-of-use).*)"],
};
