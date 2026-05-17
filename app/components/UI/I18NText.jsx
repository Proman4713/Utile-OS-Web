import { useCallback, useContext, useEffect, useMemo } from 'react';
import { localeContext } from '../../contexts/localeManagement';
import { motion } from "motion/react";

/**
 * 
 * @param {import("react").HTMLAttributes & import("motion/react").HTMLMotionProps<HTMLHeadingElement> & { style: import("react").CSSProperties, mode: "brand" | "subtext" | "regular", forceText: boolean, ltr: boolean, rtl: boolean, children: import("react").JSX.Element, ref: import("react").Ref }} param0 
 */
export default function I18NText({ style, mode="regular", forceText=false, ltr=false, rtl=false, children, ref, ...props }) {
	const { appText, locale } = useContext(localeContext);

	const returnComponent = useCallback(() => {
		if (typeof children === "string" && !forceText) {
			return appText[children] || children;
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

	return (
		<motion.h1 ref={ref} style={{ ...{ fontFamily, includeFontPadding: false, direction: 
			ltr
				? ltr
				: rtl
					? rtl
					: locale === "ar" 
						? "rtl"
						: "ltr" }, ...style }} {...props}>{returnComponent()}</motion.h1>
	);
}