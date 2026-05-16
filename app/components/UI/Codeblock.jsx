import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('javascript', javascript);

export default function Codeblock({ code="", isString=false, language="javascript", ...props }) {
	const codeblockRef = useRef(null);
	const [ copied, setCopied ] = useState(false);

	useEffect(() => {
		if (codeblockRef.current === null) return;

		const processedCode = code.split("\n")
									.map(line => {
										if (line.length <= 160) return line;
										return line.slice(0, 150) + " { ... } " + line.slice(-10);
									}).join("\n");

		codeblockRef.current.innerHTML = processedCode;

		if (isString) return;
		codeblockRef.current.removeAttribute("data-highlighted");
		hljs.highlightElement(codeblockRef.current);
	}, [code, isString])

	return (
		<>
			<motion.div {...props} className="codeblock-container">
				{code
					? <>
						<button onClick={() => {
							if (navigator.clipboard) {
								navigator.clipboard.writeText(code).catch(console.warn);
							}
							setCopied(true);
							setTimeout(() => {
								setCopied(false)
							}, 2000)
						}} className="copy-to-clip">
							<FontAwesomeIcon
								icon={copied ? faCheck : faCopy}
								color="white"
							/>
							&nbsp;&nbsp;{copied ? "COPIED" : "COPY"}
						</button>
						<div ref={codeblockRef} className={`codeblock ${isString ? "string-code" : "non-str"} language-${language}`}>
							{code}
						</div>
					</>
				: null}
			</motion.div>
		</>
	);
}