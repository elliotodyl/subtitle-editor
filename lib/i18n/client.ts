"use client";

import { useEffect } from "react";
import i18next, { FlatNamespace, KeyPrefix } from "i18next";
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions, UseTranslationResponse, FallbackNs } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { i18nConfig } from "@/i18n-config";

const runsOnServerSide = typeof window === "undefined";

i18next
	.use(initReactI18next)
	.use(resourcesToBackend((language: string, namespace: string) => import(`/public/locales/${language}/${namespace}.json`)))
	.init({
		lng: undefined,
		fallbackLng: i18nConfig.defaultLocale,
		supportedLngs: i18nConfig.locales,
		fallbackNS: "common",
		defaultNS: "common",
		preload: i18nConfig.locales,
	});

export function useTranslation<Ns extends FlatNamespace, KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined>(
	lng: string,
	ns?: Ns,
	options?: UseTranslationOptions<KPrefix>,
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
	const { i18n } = useTranslationOrg(ns, options);

	useEffect(() => {
		if (!runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
			i18n.changeLanguage(lng);
		}
	}, [lng, i18n]);

	return useTranslationOrg(ns, options);
}
