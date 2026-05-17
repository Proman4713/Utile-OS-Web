import Header from "../../components/UI/Header";
import I18NText from "../../components/UI/I18NText";
import Section from "../../components/UI/Section";
import { AppThemeContext } from "../../contexts/colours";
import { useContext } from "react";
import { motion } from "motion/react"
import logo from "../../assets/SVGs/logo-transparent.svg"
import lockupStrict from "../../assets/SVGs/lockup-strict.svg"
import Footer, { defaultSocials } from "../../components/UI/Footer";
import useWindowDimensions from "../../utils/windowDimensions";

export const meta = () => [
	{ title: "About — Utile OS" }
];

export default function About() {
	const { colours } = useContext(AppThemeContext);
	const { isMobile } = useWindowDimensions();

	return (
		<>
			<Header />
			<Section divide={false} noGap>
				<I18NText mode="brand" style={{ color: colours.grey }}>about</I18NText>
				<motion.img
					src={lockupStrict}
					className="no-mobile"
					width={738}
				/>
				<motion.img
					src={logo}
					className="no-desktop no-tablet"
					width={294.912}
				/>
			</Section>
			<Section divide={false} noGap>
				<I18NText mode="brand" style={{ color: colours.grey, fontSize: isMobile ? 22 : 32, maxWidth: "85%" }}>description_preamble</I18NText>
			</Section>
			<Section divide={false} noGap>
				<I18NText mode="subtext" style={{ color: colours.grey, fontSize: isMobile ? 22 : 32, maxWidth: "85%" }}>description_reasoning</I18NText>
			</Section>
			<Section divide={false} noGap>
				<I18NText mode="subtext" style={{ color: colours.grey, fontSize: isMobile ? 22 : 32, maxWidth: "85%" }}>description_conclusion</I18NText>
			</Section>
			<Footer socials={defaultSocials.filter((k, i) => k[1] !== "experimental")} />
		</>
	);
}