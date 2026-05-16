import { useEffect, useLayoutEffect, useState } from "react";

export default function useLetAnimation() {
	const [shouldAnimate, setShouldAnimate] = useState(true);

	useEffect(() => {
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		setShouldAnimate(!isMobile && !prefersReducedMotion);
	}, []);

	return shouldAnimate;
}