import { motion } from "motion/react";
import I18NText from "./I18NText";
import { useContext } from "react";
import { AppThemeContext } from "../../contexts/colours";

// TODO
export default function BlogCard({
	title="",
	id="",
	author="",
	date=new Date(),
	imageUrl=""
}) {
	const { colours } = useContext(AppThemeContext);

	return (
		<>
			<motion.div
				style={{
					padding: 20,
					borderRadius: 20,
					minWidth: "25vw",
					minHeight: 250,
					backgroundColor: colours.primary
				}}
				className="flex-cmn"
			>
				<div className="flex-row sub-spacing justify-end align-end">
					<I18NText mode="subtitle" style={{ fontSize: 32 }}>{title}</I18NText>
					<I18NText style={{ fontSize: 16 }}>by {author}</I18NText>
				</div>
			</motion.div>
		</>
	);
}