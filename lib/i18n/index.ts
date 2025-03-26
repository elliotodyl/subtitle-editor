import { createInstance, FlatNamespace, KeyPrefix } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { FallbackNs } from "react-i18next";
import { i18nConfig } from "@/i18n-config";

const initI18next = async (lng: string, ns: string | string[]) => {
	// on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
	const i18nInstance = createInstance();
	await i18nInstance
		.use(initReactI18next)
		.use(resourcesToBackend((language: string, namespace: string) => import(`/public/locales/${language}/${namespace}.json`)))
		// .init(getOptions(lng, ns))
		.init({
			// debug: true,
			lng: lng,
			fallbackLng: i18nConfig.defaultLocale,
			supportedLngs: i18nConfig.locales,
			fallbackNS: "common",
			defaultNS: "common",
			ns,
			preload: i18nConfig.locales,
		});
	return i18nInstance;
};

export async function serverSideTranslation<Ns extends FlatNamespace, KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined>(
	lng: string,
	ns?: Ns,
	options: { keyPrefix?: KPrefix } = {},
) {
	const i18nextInstance = await initI18next(lng, Array.isArray(ns) ? (ns as string[]) : (ns as string));
	return {
		i18n: i18nextInstance,
		t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
		// t: i18nextInstance.t,
	};
}
