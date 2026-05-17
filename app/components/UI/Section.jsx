import "../../styles/Section.css"
import React, { useCallback, useContext, useMemo } from "react";
import { AppThemeContext } from "../../contexts/colours";
import useLetAnimation from "../../utils/useLetAnimation";

export default function Section({
	background=false,
	backgroundConfig={
		imageUrl: "/logo_original.png",
		imageSrc: null,
		imageBg: "white"
	},
	id = "",
	noGap=false,
	divide=true,
	slow=false,
	children
}) {
	const shouldAnimate = useLetAnimation();

	const sectionStyles = useMemo(() => ({
		container: {
			display: "flex",
			flexDirection: "column",
			gap: noGap ? 0 : 32,
			backgroundSize: "cover",
			justifyContent: "center",
			alignContent: "center",
			alignItems: "center",
			minHeight: "100vh"
		}
	}), [noGap]);

	const renderChildren = useMemo(() => {
		return React.Children.map(children, (child, i) =>
			React.cloneElement(child, {
				key: `section-child-${i}-${shouldAnimate}`,
				initial: shouldAnimate ? { opacity: 0, transform: "translateY(30px)" } : false,
				whileInView: shouldAnimate ? { opacity: 1, transform: "translateY(0px)" } : false,
				transition: shouldAnimate ? { duration: slow ? 1 : 0.4, delay: 0.3 + (i * (slow ? 0.8 : 0.3)) } : false,
				viewport: shouldAnimate ? { once: true } : false
			})
		)
	}, [shouldAnimate, children])

	return (
		<>
			<section className="section" id={id} style={sectionStyles.container}>
				{background
					? <>
						<div className="SectionLayer Layer-0" style={{
							backgroundColor: backgroundConfig.imageBg,
							backgroundImage: backgroundConfig.imageSrc || `url("${backgroundConfig.imageUrl}")`,
							backgroundRepeat: "no-repeat"
						}} />
						<div className="SectionLayer" style={{ backgroundColor: "black", opacity: 0.5 }} />
					</>
					: null}
				{renderChildren}
			</section>
			{divide && <div style={{ width: 10, minHeight: 200, backgroundColor: "transparent", opacity: 0.5 }} />}
		</>
	);
}