import {
	createContext,
	useMemo,
	useState
} from "react";

export const localeContext = createContext();

import en from "../assets/lang/en.json";
import ar from "../assets/lang/ar.json";

export function LocaleProvider({
	children
}) {
	const [locale, setLocale] = useState("en");
	const availableLocales = { en, ar }
	const [ isRTL, setIsRTL ] = useState(false);
	//const memoizedLocale = useMemo(() => locale, [locale]);

	const getApplicationLocale = () => {
		try {
			if (typeof window === "undefined") return setLocale('en');
			const localeSetting = localStorage.getItem('locale');

			if (localeSetting !== null) {
				setLocale(localeSetting);
				setIsRTL(localeSetting === "ar")
			}
		} catch (e) {
			return;
		}
	};

	const setApplicationLocale = (locale) => {
		try {
			if (typeof window === "undefined") return setLocale(locale);
			localStorage.setItem('locale', locale);
			setLocale(locale);
			setIsRTL(locale === "ar")
		} catch (e) {
			return;
		}
	}

	const appText = useMemo(() => {
		//* console.log(locale)

		// base translations for the current locale
		const curLocaleJson = { ...availableLocales[locale] };
		for (const entry of Object.keys(curLocaleJson)) {
			if (!curLocaleJson[entry]) {
				delete curLocaleJson[entry]
			}
		}
		const base = { ...en, ...curLocaleJson };

		// dynamic replacements available to templates in the JSON
		const getDynamicReplacements = () => {
			const os_version = import.meta.env.VITE_APP_OS_VERSION || "";
			const latest_snapshot = import.meta.env.VITE_APP_LATEST_SNAPSHOT || "";
			const ubuntu_version = import.meta.env.VITE_APP_UBUNTU_VERSION || "";
			return { os_version, latest_snapshot, ubuntu_version };
		};

		// Recursively replace {{key}} placeholders in strings
		const replacePlaceholders = (value, replacements) => {
			if (typeof value === 'string') {
				return value.replace(/\{\{(\w+)\}\}/g, (_, k) => (replacements[k] !== undefined ? replacements[k] : `{{${k}}}`));
			}
			if (Array.isArray(value)) return value.map(v => replacePlaceholders(v, replacements));
			if (value && typeof value === 'object') {
				const out = {};
				for (const key in value) out[key] = replacePlaceholders(value[key], replacements);
				return out;
			}
			return value;
		};

		const replacements = getDynamicReplacements();
		return replacePlaceholders(base, replacements);
	}, [locale]);

	return (
		<localeContext.Provider
			value={{
				locale,
				getApplicationLocale,
				setApplicationLocale,
				appText,
				availableLocales,
				isRTL
			}}
		>
			{children}
		</localeContext.Provider>
	);
}