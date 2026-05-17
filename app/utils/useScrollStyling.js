import { useEffect } from "react";

export function useScrollStyling(colours, forceBG) {
	if (typeof window !== 'undefined') {
		const header = document.querySelector("header");
		if (!header) return;
		//* console.log(colours, forceBG)

		if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
			header.style.padding = '0px 10px';
			if (forceBG === "translucent") return;
			header.classList.remove('header-transparent');
		} else {
			header.style.padding = '10px 10px';
			if (forceBG === "opaque") return;
			header.classList.add('header-transparent');
		}
	}

	useEffect(() => {
		function scrollFunction() {
			const header = document.querySelector("header");
			if (!header) return;

			if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
				header.style.padding = '0px 10px';
				if (forceBG === "translucent") return;
				header.classList.remove('header-transparent');
			} else {
				header.style.padding = '10px 10px';
				if (forceBG === "opaque") return;
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

		return () => {
			document.body.removeEventListener("scroll", handleScroll);
			// document.body.removeEventListener("resize", changeHeaderStyles);
		};
	}, [colours]);
}