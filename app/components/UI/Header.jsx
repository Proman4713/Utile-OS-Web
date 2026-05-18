import "../../styles/Header.css";
import React, { useContext, useEffect } from 'react';
import { AppThemeContext } from "../../contexts/colours";
import { localeContext } from "../../contexts/localeManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

import logo from "../../assets/SVGs/logo-transparent.svg";
import { useScrollStyling } from "../../utils/useScrollStyling";
import { faDownload, faGlobe, faNewspaper, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const SecondaryNavItem = ({ text, id="", icon, target="/", onClick=() => { }, internal=true }) => {
	const { colours } = useContext(AppThemeContext);
	const { appText } = useContext(localeContext);
	
	return (
		<li className="nav-item" {...(id ? { id } : {})} onClick={onClick}>
			{ icon && <><FontAwesomeIcon icon={icon} fontSize={"2em"} />{text && (<span> &nbsp;&nbsp;</span>)}</> }
			{text && <Link to={target} style={{ fontSize: "1.5em" }} target={internal ? "" : "_blank"}>
				{appText[text] || text}
			</Link>}
		</li>
	)
}

export default function Header({
	showAppName = true,
	forceBG=false,
	drawer=false,
	drawerOpen=false,
	setDrawerOpen=() => {},
	drawerTitle="Drawer Title",
	drawerItems = [
		{
			text: "Item 1",
			onClick: () => {},
			active: true
		},
		{
			text: "Item 2",
			onClick: () => {}
		}
	]
}) {
	const { colours } = useContext(AppThemeContext);
	const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
	const [isDropdownActive, setIsDropdownActive] = React.useState(false);
	const { appText, locale, setApplicationLocale, availableLocales, isRTL } = useContext(localeContext);
	useScrollStyling(colours, forceBG);

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (e.target.id !== "pfp") {
				setIsDropdownActive(false);
				setTimeout(() => {
					setIsDropdownVisible(false);
				}, 200);
			}
		};

		document.addEventListener("click", handleOutsideClick);
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [isDropdownVisible]);

	function toggleDropdown(e) {
		if (!isDropdownVisible) {
			setIsDropdownVisible(true);
			setTimeout(() => {
				setIsDropdownActive(true);
			}, 50);
		} else {
			setIsDropdownActive(false);
			setTimeout(() => {
				setIsDropdownVisible(false);
			}, 200);
		}
		if (e) {
			e.stopPropagation();
		}
	}

	return (
		<>
			<div id="sticky-container" className="height-max-content">
				<header
					style={{
						backgroundColor: "rgba(255, 255, 255, 0.8)",
						backdropFilter: "blur(10px)",
						marginBottom: 0,
						[forceBG === "opaque" ? "padding" : ""]: 0 
					}}
					id="header"
					className={forceBG === "opaque" ? "" : "header-transparent"}
				>
					<div className="header-container" style={{ [isRTL ? "flexDirection" : ""]: "row-reverse" }}>
						{(drawer && !showAppName)
							? <>
								
							</>
							: null}
						{showAppName && <Link to="/">
							<img
								src={logo}
								height="32px"
								alt="Logo"
								loading="lazy"
								className="no-mobile headerTextLogo"
							/>
							<img
								src="/logo192.png"
								alt="Logo"
								loading="lazy"
								className="no-desktop no-tablet headerTextLogo"
							/>
						</Link>}
						{(drawer && !showAppName)
							? <FontAwesomeIcon
								// icon={}
								size="2x"
								color="white"
								style={{
									cursor: "pointer",
									// marginLeft: -30,
									marginRight: 20,
									userSelect: "none",
									msUserSelect: "none",
									WebkitUserSelect: "none",
									MozUserSelect: "none"
								}}
								aria-label="Open navigation drawer"
								role="button"
								tabIndex={0}
								focusable
								onClick={() => setDrawerOpen(!drawerOpen)}
								onKeyDown={e => e.key === "Enter" && setDrawerOpen(!drawerOpen)}
							/>
							: null}
						<nav className="nav" style={{ [isRTL ? "justifyContent" : ""]: "flex-start" }}>
							<ul className="secondary-nav" style={{ [isRTL ? "flexDirection" : ""]: "row-reverse" }}>
								<SecondaryNavItem
									icon={faDownload}
									text="download"
									target="/download"
								/>
								<SecondaryNavItem
									icon={faNewspaper}
									text="blog"
									target="/"
									// target="blog.utile-os.com"
								/>
								<SecondaryNavItem
									icon={faShieldHalved}
									text="privacy"
									target="/privacy"
									// target="blog.utile-os.com"
								/>
								<SecondaryNavItem
									icon={faGlobe}
									onClick={e => toggleDropdown(e)}
								/>
							</ul>
						</nav>
						{isDropdownVisible && (
							<div className="dropdownMenu" style={{
								backgroundColor: colours.grey + "99",
								border: `1px solid ${colours.success + "63"}`,
								transform: `scaleY(${isDropdownActive ? 1 : 0})`,
								transformOrigin: "top",
								transition: "all 200ms ease-out",
								opacity: isDropdownActive ? 1 : 0,
								[isRTL ? "left" : "right"]: "1%"
							}}>
								<ul>
									{Object.keys(availableLocales).map((item, index) => (
										<li
											key={index}
											onClick={() => setApplicationLocale(item)}
											style={{ textAlign: locale === "ar" ? "right" : "left" }}
										>
											{appText[item] || item}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</header>
			</div>
		</>
	);
}