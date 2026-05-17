import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from "react-router";

import stylesheet from "./styles/app.css?url";
import { LocaleProvider } from "./contexts/localeManagement";
import { AppThemeProvider } from "./contexts/colours";
import Codeblock from "./components/UI/Codeblock";
import { motion } from "motion/react";
import Section from "./components/UI/Section";
import I18NText from "./components/UI/I18NText";
import { useEffect } from "react";

export const links = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Inclusive+Sans:ital,wght@0,300..700;1,300..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{ rel: "stylesheet", href: stylesheet },
	{ rel: "icon", href: "/favicon.ico" },
	{ rel: "apple-touch-icon", href: "/logo192.png" }
];

export function Layout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				{/* Embed Data */}
					{/* Twitter, not X */}
					<meta content="summary" property="twitter:card" />
					<meta content="Utile OS" property="twitter:title" />
					<meta content="/logo_original.png" property="twitter:image" />

					{/* Open Graph */}
					<meta content="Utile OS" property="og:site_name" />
					<meta content="Homepage" property="og:title" />
					<meta property="og:description" content="A minimum-friction Linux desktop" />

					<meta content="/logo_original.png" property="og:image" />
					<meta name="theme-color" content="#1A5E63" />

					{/* <meta content="https://" property="og:url" /> */}
					<meta property="og:type" content="website" />

					{/* Miscellaneous */}
					<meta name="description" content="A minimum-friction Linux desktop" />
					<meta name="author" content="Utile OS" />
				{/* End Embed Data */}

				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

function BodyNavigator() {
	let location = useLocation();

	useEffect(() => {
		document.body.scrollTo(0, 0);
	}, [location.pathname]);

	return <Outlet />
}

export default function App() {
	return <>
		<AppThemeProvider>
			<LocaleProvider>
				<BodyNavigator />
			</LocaleProvider>
		</AppThemeProvider>
	</>;
}

export function ErrorBoundary({ error }) {
	let message = "We have a problem :(";
	let details = "An unexpected error occurred.";
	let stack;

	if (isRouteErrorResponse(error)) {
		message = `Error ${error.status}`;
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<AppThemeProvider>
			<LocaleProvider>
				<Section divide={false} noGap>
					<I18NText mode="subtext">
						{message}
					</I18NText>
					<I18NText mode="subtext" style={{ fontSize: 16, fontWeight: "400", margin: 12 }}>
						{details}
					</I18NText>
					<Codeblock style={{ marginTop: "8px" }} code={stack} />
				</Section>
			</LocaleProvider>
		</AppThemeProvider>
	);
}
