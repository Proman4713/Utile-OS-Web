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
	//const memoizedLocale = useMemo(() => locale, [locale]);

	const getApplicationLocale = () => {
		try {
			if (typeof window === "undefined") return setLocale('en');
			const localeSetting = localStorage.getItem('locale');

			if (localeSetting !== null) {
				setLocale(localeSetting);
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
		} catch (e) {
			return;
		}
	}

	const appText = useMemo(() => {
		//* console.log(locale)

		return { en, ar }[locale];
	}, [locale]);

	return (
		<localeContext.Provider
			value={{
				locale,
				getApplicationLocale,
				setApplicationLocale,
				appText
			}}
		>
			{children}
		</localeContext.Provider>
	);
}