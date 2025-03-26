export const defaultNS = "common";
export const cookieName = "NEXT_LOCALE";
import { i18nConfig } from "@/i18n-config";

export function getOptions(lng = i18nConfig.defaultLocale, ns: string | string[] = defaultNS) {
	return {
		// debug: true,
		supportedLngs: i18nConfig.locales,
		// preload: languages,
		fallbackLng: i18nConfig.defaultLocale,
		lng: lng,
		fallbackNS: defaultNS,
		defaultNS,
		ns,
	};
}
