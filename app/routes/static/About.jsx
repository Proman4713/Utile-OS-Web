import Header from "../../components/UI/Header";
import I18NText from "../../components/UI/I18NText";
import Section from "../../components/UI/Section";
import { AppThemeContext } from "../../contexts/colours";
import { useContext } from "react";
import { motion } from "motion/react"
import lockupStrict from "../../assets/SVGs/lockup-strict.svg"
import Footer, { defaultSocials } from "../../components/UI/Footer";
import { faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCoffee, faDownload, faLegal, faShieldHalved, faWarning } from "@fortawesome/free-solid-svg-icons";

export const meta = () => [
	{ title: "About — Utile OS" }
];

export default function About() {
	const { colours } = useContext(AppThemeContext);

	return (
		<>
			<Header />
			<Section divide={false} noGap>
				<I18NText mode="brand" style={{ color: colours.grey }}>about</I18NText>
				<motion.img
					src={lockupStrict}
					width={738}
				/>
			</Section>
			<Section divide={false} noGap>
				<I18NText mode="brand" style={{ color: colours.grey, fontSize: 32, maxWidth: "85%" }}>description_preamble</I18NText>
			</Section>
			<Section divide={false} noGap>
				<I18NText mode="subtext" style={{ color: colours.grey, fontSize: 32, maxWidth: "85%" }}>description_reasoning</I18NText>
			</Section>
			<Section divide={false} noGap>
				<I18NText mode="subtext" style={{ color: colours.grey, fontSize: 32, maxWidth: "85%" }}>description_conclusion</I18NText>
			</Section>
			<Footer socials={defaultSocials.filter((k, i) => k[1] !== "experimental")} />
		</>
	);
}