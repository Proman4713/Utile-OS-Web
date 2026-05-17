import "../../styles/Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AppThemeContext } from "../../contexts/colours";
import I18NText from "./I18NText";
import lockup from "../../assets/SVGs/lockup-transparent.svg"
import { Link } from "react-router";

function Social({ icon, text, to="", external=true, key }) {
	let component = <></>;

	console.log(text, external, to)
	if (external) {
		component = (
			<div key={key} className="flex align-center social" onClick={() => window.open(to, "_blank")}>
				<FontAwesomeIcon size="2x" icon={icon} />
				<I18NText mode="brand" className="homepage-text footnote" style={{ color: "inherit" }}>{text}</I18NText>
			</div>
		)
	} else {
		component = (
			<Link key={key} className="flex align-center social" to={to}>
				<FontAwesomeIcon size="2x" icon={icon} />
				<I18NText mode="brand" className="homepage-text footnote" style={{ color: "inherit" }}>{text}</I18NText>
			</Link>
		)
	}
	return component
}

export default function Footer({ paragraphs=[], socials=[] }) {
	const { colours } = useContext(AppThemeContext);

	return (
		<>
			<div className="flex space-between align-center" style={{ minHeight: 430, backgroundColor: colours.brand + "44", zIndex: 9999, padding: 25 }}>
				<div className="flex-cmn space-between align-center" style={{ height: "100%", maxWidth: 700 }}>
					<img
						src={lockup}
						alt="Utile OS lockup"
						style={{ height: 100, marginRight: 25 }}
					/>
					{paragraphs.map((p, i) => {
						return <I18NText key={i} mode="subtext" className="homepage-text footnote">{p}</I18NText>
					})}
				</div>
				<div className="flex-cmn space-between align-end" style={{ height: "100%", maxWidth: 500 }}>
					{socials.map((social=[], i) => {
						return <Social key={i} icon={social[0] || null} text={social[1] || null} to={social[2] || ""} external={social[3]} />
					})}
				</div>
			</div>
		</>
	);
}