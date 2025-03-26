import { Config } from "next-i18n-router/dist/types";

export const i18nConfig: Config = {
	locales: ["en"],
	defaultLocale: "en",
	serverSetCookie: "if-empty",
};

export type Locale = (typeof i18nConfig)["locales"][number];
