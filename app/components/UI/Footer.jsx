import "../../styles/Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AppThemeContext } from "../../contexts/colours";
import I18NText from "./I18NText";
import lockup from "../../assets/SVGs/lockup-transparent.svg"
import { Link, useNavigate } from "react-router";
import { faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCoffee, faDownload, faEnvelope, faLegal, faShieldHalved, faWarning } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../../utils/windowDimensions";

function Social({ icon, text, to="", external=true, innerKey }) {
	let component = <></>;

	if (external) {
		component = (
			<div key={innerKey} className="flex align-center social" onClick={() => window.open(to, "_blank")}>
				<FontAwesomeIcon style={{ fontSize: "1.6em" }} icon={icon} />
				<I18NText mode="brand" className="homepage-text footnote" style={{ color: "inherit" }}>{text}</I18NText>
			</div>
		)
	} else {
		component = (
			<Link key={innerKey} className="flex align-center social" to={to}>
				<FontAwesomeIcon style={{ fontSize: "1.6em" }} icon={icon} />
				<I18NText mode="brand" className="homepage-text footnote" style={{ color: "inherit" }}>{text}</I18NText>
			</Link>
		)
	}
	return component
}

export const defaultParagraphs = [
	"experimental_only", "supported_archs", "support_us", "made_with_passion"
]

export const defaultSocials = [
	[faYoutube, "youtube", "https://youtube.com/@lots_of_codeswallop"],
	[faGithub, "github", "https://github.com/Proman4713/Utile-OS"],
	[faCoffee, "buy_coffee", "https://buymeacoffee.com/codeswallop"],
	[faEnvelope, "contact", "mailto:aaser.mohammed@mawjood.education"],
	[faWarning, "experimental", "/about", false],
	[faShieldHalved, "privacy", "/privacy", false],
	[faDownload, "download_utile", "/download", false],
	[faLegal, "copyright", "https://github.com/Proman4713/Utile-OS-web/tree/main/LICENSE"],
]

export default function Footer({ paragraphs=defaultParagraphs, socials=defaultSocials }) {
	const { colours } = useContext(AppThemeContext);
	const { isTablet, isMobile } = useWindowDimensions();
	const navigate = useNavigate();

	return (
		<>
			<div className="flex space-between align-center" style={{ minHeight: 344, backgroundColor: colours.brand + "44", zIndex: 9999, padding: 20 }}>
				<div className="flex-cmn space-between align-center" style={{ height: "100%", [isMobile ? "" : "maxWidth"]: 560 }}>
					<img
						src={lockup}
						alt="Utile OS lockup"
						style={{ height: 80 }}
						onClick={() => isMobile ? navigate("/about") : null}
					/>
					{paragraphs.map((p, i) => {
						return <I18NText key={i} mode="subtext" className="homepage-text footnote">{p}</I18NText>
					})}
				</div>
				<div className="flex-cmn space-between align-end no-mobile" style={{ height: "100%", maxWidth: 400 }}>
					{socials.map((social=[], i) => {
						return <Social key={i} innerKey={i} icon={social[0] || null} text={social[1] || null} to={social[2] || ""} external={social[3]} />
					})}
				</div>
			</div>
		</>
	);
}