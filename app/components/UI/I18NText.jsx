import { useCallback, useContext, useEffect, useMemo } from 'react';
import { localeContext } from '../../contexts/localeManagement';
import { motion } from "motion/react";

/**
 * Parses markdown links [text](url), italics *text*, and newlines in text
 */
const parseFormattedText = (text) => {
	if (typeof text !== "string") return text;

	const parts = [];
	const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
	const italicRegex = /\*([^\*]+)\*/g;
	let lastIndex = 0;
	let match;

	// First pass: split by links and italics
	while ((match = linkRegex.exec(text)) !== null) {
		// Add text before the link (with bold+italic parsing)
		if (match.index > lastIndex) {
			const textBefore = text.slice(lastIndex, match.index);
			parts.push(...parseEmphasisAndNewlines(textBefore));
		}

		// Add the link
		parts.push(
			<a key={`link-${match.index}`} href={match[2]} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.5, transition: "all 300ms ease" }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.5}>
				{match[1]}
			</a>
		);

		lastIndex = linkRegex.lastIndex;
	}

	// Add remaining text (with bold+italic parsing)
	if (lastIndex < text.length) {
		parts.push(...parseEmphasisAndNewlines(text.slice(lastIndex)));
	}

	return parts.length > 0 ? parts : text;
};

// Parse bold (**text**) first, then italics (*text*), preserving newlines.
const parseEmphasisAndNewlines = (text) => {
	const parts = [];
	const boldRegex = /\*\*([^\*]+)\*\*/g;
	let lastIndex = 0;
	let match;

	while ((match = boldRegex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			const textBefore = text.slice(lastIndex, match.index);
			parts.push(...splitByNewlines(textBefore));
		}

		// Inside bold we still allow italics, so parse inner text recursively for italics/newlines
		const inner = match[1];
		const innerParts = parseItalicsAndNewlines(inner);
		parts.push(
			<strong key={`bold-${match.index}`}>{innerParts}</strong>
		);

		lastIndex = boldRegex.lastIndex;
	}

	if (lastIndex < text.length) {
		parts.push(...parseItalicsAndNewlines(text.slice(lastIndex)));
	}

	return parts.length > 0 ? parts : [text];
};

// Helper: parse single-star italics and newlines (used by bold parser and top-level)
const parseItalicsAndNewlines = (text) => {
	const parts = [];
	const italicRegex = /\*([^\*]+)\*/g;
	let lastIndex = 0;
	let match;

	while ((match = italicRegex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			const textBefore = text.slice(lastIndex, match.index);
			parts.push(...splitByNewlines(textBefore));
		}

		parts.push(
			<em key={`italic-${match.index}`}>{match[1]}</em>
		);

		lastIndex = italicRegex.lastIndex;
	}

	if (lastIndex < text.length) {
		parts.push(...splitByNewlines(text.slice(lastIndex)));
	}

	return parts.length > 0 ? parts : [text];
};

const splitByNewlines = (text) => {
	return text.split('\n').flatMap((line, index, array) => {
		const elements = [line];
		if (index < array.length - 1) {
			elements.push(<br key={`br-${index}`} />);
		}
		return elements;
	});
};

/**
 * 
 * @param {import("react").HTMLAttributes & import("motion/react").HTMLMotionProps<HTMLHeadingElement> & { style: import("react").CSSProperties, mode: "brand" | "subtext" | "regular", forceText: boolean, ltr: boolean, rtl: boolean, children: import("react").JSX.Element, ref: import("react").Ref }} param0 
 */
export default function I18NText({ style, mode="regular", forceText=false, ltr=false, rtl=false, children, ref, ...props }) {
	const { appText, locale } = useContext(localeContext);

	const returnComponent = useCallback(() => {
		if (typeof children === "string" && !forceText) {
			const text = appText[children] || children;
			return parseFormattedText(text);
		}

		return children;
	}, [children, locale])

	const fontFamily = useMemo(() => {
		switch (mode) {
			case "brand":
				return "Ubuntu, sans-serif";
			case "subtext":
				return "Inclusive Sans, sans-serif";
			default:
				return undefined;
		}
	}, [mode]);

	const Tag = mode === "regular" ? motion.div : motion.h1;

	return (
		<Tag ref={ref} style={{ ...{ fontFamily, textAlign: "center", direction: 
			ltr
				? ltr
				: rtl
					? rtl
					: locale === "ar" 
						? "rtl"
						: "ltr" }, ...style }} {...props}>{returnComponent()}</Tag>
	);
}