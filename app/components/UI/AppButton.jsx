import { useContext, useMemo } from "react";
import { AppThemeContext } from "../../contexts/colours";
import { localeContext } from "../../contexts/localeManagement";
import TouchableOpacity from "../custom/TouchableOpacity";
import I18NText from "./I18NText";

/**
 * 
 * @param {import("react").ButtonHTMLAttributes & { disabled: boolean, onPress: Function, text: string, loading: boolean, style: import("react").CSSProperties, textStyle: import("react").CSSProperties, ref: import("react").Ref }} param0 
 */
export default function AppButton({ disabled = false, onPress = () => { }, text = "", loading = false, style = {}, textStyle = {}, ref, ...props }) {
	const { colours } = useContext(AppThemeContext);
	const { locale } = useContext(localeContext);

	const standardButtonStyles = useMemo(() => ({
		btn: {
			padding: 8,
			backgroundColor: "transparent",
			backgroundImage: `linear-gradient(45deg, ${colours.primary}, ${colours.monochromatic})`,
			width: "clamp(280px, 24%, 24%)",
			alignSelf: "center",
			borderRadius: 44,
			height: 44,

			display: "flex",
			justifyContent: "center",
			alignContent: "center",
			alignItems: "center",
			flexDirection: "row",
			border: "none",
			outline: "none",

			transition: "300ms all ease",
			cursor: "pointer"
		},
		btnText: {
			color: "white",
			fontSize: 17.6,
			textAlign: "center",
			fontWeight: "bold"
		},
	}), [colours, locale]);

	return (
		<TouchableOpacity
			{...props}
			style={{
				...standardButtonStyles.btn, ...style
			}}
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.5}
			ref={ref}
			className="btn-standard"
		>
			<I18NText style={{ ...standardButtonStyles.btnText, ...textStyle }}>
				{loading
					? null // ? <PropagateLoader size={10} color={dark ? colours.mawjoodMain + "AA" : colours.listItem + "AA"} cssOverride={{ textAlign: "center" }} />
					: text}
			</I18NText>
		</TouchableOpacity>
	);
}