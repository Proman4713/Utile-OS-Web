import "../../styles/Download.css";
import { useContext } from "react";
import I18NText from "../../components/UI/I18NText";
import Section from "../../components/UI/Section";
import { AppThemeContext } from "../../contexts/colours";
import logo from "../../assets/SVGs/logo-transparent.svg";
import Header from "../../components/UI/Header";
import AppButton from "../../components/UI/AppButton";
import { localeContext } from "../../contexts/localeManagement";
import Footer, { defaultSocials } from "../../components/UI/Footer";
import TabbedDiv from "../../components/UI/TabbedDiv";
import { motion } from "motion/react";
import useWindowDimensions from "../../utils/windowDimensions";

export const meta = () => [
	{ title: "Download Utile OS" }
];

export default function Download() {
	const { colours } = useContext(AppThemeContext);
	const { appText, isRTL } = useContext(localeContext);
	const { isDesktop } = useWindowDimensions();

	return (
		<>
			<Header forceBG="opaque" />
			<Section divide={false}>
				<motion.div className="flex space-between align-center" style={{ flex: 1, [isRTL ? "flexDirection" : ""]: "row-reverse", width: "95%" }}>
					<div className={`flex-cmn justify-center ${isDesktop ? isRTL ? "align-right" : "align-left" : "align-center"}`} style={{ gap: 16, width: isDesktop ? "50%" : "100%" }}>
						<I18NText
							mode="brand"
							className="flex align-center"
							style={{ fontSize: 48, color: colours.grey }}
						>
							utile_version
						</I18NText>
						<TabbedDiv
							tabs={[
								{
									name: "tab_description",
									component: (
										<I18NText key={1} style={{ fontSize: 14.4, fontWeight: 700, color: colours.grey + "CC", textAlign: isRTL ? "right" : "left" }}>download_description</I18NText>
									)
								},
								{
									name: "tab_features",
									component: (
										<ul key={1} className="feature-list" style={{ direction: isRTL ? "rtl" : "ltr" }}>
											{["ubuntu_gnome_base", "reordered_layout", "preconfigured_themes", "gnome_extensions", "optimised_keybinds"].map((feature, i) => (
												<li key={i}>{appText[feature] || feature}</li>
											))}
										</ul>
									)
								}
							]}
						/>
						<AppButton
							text={appText["download_utile"] + " (5.7 GiB)"}
						/>
					</div>
					<div className="flex-cmn justify-center align-center no-tablet no-mobile">
						<img
							src={logo}
							id="download-logo"
							alt="Utile Logo"
							width={409.6}
							style={{ display: "inline" }}
						/>
					</div>
				</motion.div>
			</Section>
			<Footer socials={defaultSocials.filter((k, i) => k[1] !== "download_utile")} />
		</>
	);
}