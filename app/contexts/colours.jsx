import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState
} from "react";

export const AppThemeContext = createContext();

const Appearance = {
	getColourScheme: () => {
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
	},
	addChangeListener: (func) => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const listener = (e) => func(e);
		mediaQuery.addEventListener('change', listener);

		return {
			remove: () => mediaQuery.removeEventListener('change', listener)
		};
	}
}

export function AppThemeProvider({
	children
}) {
	const [dark, setDark] = useState(false)
	const [theme, setTheme] = useState("light")

	/**
	 * A function to asynchronously get the application theme.
	 *
	 * @return {boolean} the application theme
	 */
	const getApplicationTheme = (determinedAutomatic = false) => {
		if (determinedAutomatic === true) {
			const deviceColourScheme = Appearance.getColourScheme();
			setTheme("automatic")
			return deviceColourScheme === 'dark';
		}
		try {
			if (typeof window === "undefined") return false;
			const themeSetting = localStorage.getItem('theme');

			if (themeSetting !== null && themeSetting !== 'automatic') {
				setTheme(themeSetting);
				return themeSetting === "dark";
			} else {
				const deviceColourScheme = Appearance.getColourScheme();
				setTheme("automatic");
				return deviceColourScheme === 'dark';
			}
		} catch (error) {
			//* console.error('Failed to fetch the theme from localeStorage:', error);
			return false;
		}
	}

	/**
	 * Set the runtime theme based on the application theme.
	 *
	 * @return {Promise<void>} 
	 * @param {boolean} determinedAutomatic Whether the theme was determined as automatic
	 */
	const setRuntimeTheme = useCallback((determinedAutomatic = false) => {
		const theme = getApplicationTheme(determinedAutomatic);
		
		setDark(theme);
	}, [])

	useEffect(() => {
		//* console.log("theme changed")
		setRuntimeTheme()

		const sub = Appearance.addChangeListener(() => {
			if (theme === "automatic") {
				setRuntimeTheme(true)
			}
		});
		return () => sub.remove()
	}, [theme])

	/**
	 * Returns an object containing colour values based on the value of `dark` variable.
	 *
	 * @returns {object} An object with colour values
	 */
	const colours = useMemo(() => ({
		// Configure Later
	}), [dark])

	return (
		<AppThemeContext.Provider value={
			{
				dark,
				getApplicationTheme,
				setRuntimeTheme,
				colours,
				theme
			}
		}>
			{children}
		</AppThemeContext.Provider>
	)
}