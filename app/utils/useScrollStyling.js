import { useEffect } from "react";

export function useScrollStyling(colours, forceBG) {
	useEffect(() => {
		function scrollFunction() {
			const header = document.querySelector("header");
			if (!header) return;
			console.log(forceBG, "force")
			if (forceBG === "opaque") {
				header.style.padding = '0px 8px';
				header.classList.remove('header-transparent');
				return;
			} else if (forceBG === "translucent") {
				header.style.padding = '8px 8px';
				header.classList.add('header-transparent');
				return;
			}

			if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
				if (forceBG === "translucent") return;
				header.style.padding = '0px 8px';
				header.classList.remove('header-transparent');
			} else {
				if (forceBG === "opaque") return;
				header.style.padding = '8px 8px';
				header.classList.add('header-transparent');
			}
		}

		// const changeHeaderStyles = () => {
		// 	const innerWrapper = document.querySelector(".sticky-inner-wrapper");
		// 	const outerWrapper = document.querySelector(".sticky-outer-wrapper");
		// 	if (innerWrapper && outerWrapper) {
		// 		const rect = outerWrapper.getBoundingClientRect();
		// 		innerWrapper.style.width = (rect.width || rect.right - rect.left) + "px";
		// 	}
		// };

		const handleScroll = () => {
			scrollFunction();
			// setTimeout(changeHeaderStyles, 20);
		};

		document.body.addEventListener("scroll", handleScroll);
		// document.body.addEventListener("resize", changeHeaderStyles);

		// changeHeaderStyles();
+
+		// Run once immediately to apply the correct header style on route change.
+		scrollFunction();

		return () => {
			document.body.removeEventListener("scroll", handleScroll);
			// document.body.removeEventListener("resize", changeHeaderStyles);
		};
	}, [colours, forceBG]);
}