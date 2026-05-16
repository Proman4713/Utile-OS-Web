import { useState, useEffect } from "react";

const useWindowDimensions = () => {
	if (typeof window === "undefined") return { width: undefined, height: undefined };

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [windowDimensions, setWindowDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;
