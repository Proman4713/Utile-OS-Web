import { useContext, useState } from "react";
import I18NText from "./I18NText";
import { AppThemeContext } from "../../contexts/colours";
import TouchableOpacity from "../custom/TouchableOpacity";
import AppButton from "./AppButton";
import { localeContext } from "../../contexts/localeManagement";

export default function TabbedDiv({ tabs=[] }) {
	const [ activeTab, setActiveTab ] = useState(0);
	const { colours } = useContext(AppThemeContext);
	const { isRTL } = useContext(localeContext);

	return (
		<div className="flex-cmn justify-center align-center" style={{ minWidth: "100%" }}>
			<div className="flex space-around align-center" style={{ width: "100%", [isRTL ? "flexDirection": ""]: "row-reverse" }}>
				{tabs.map((tab, index) => (
					<AppButton
						key={index}
						text={tab.name}
						onClick={() => setActiveTab(index)}
						style={{ padding: 4, backgroundImage: "none", backgroundColor: colours.light_grey + (activeTab === index ? "" : "AA"), width: "20%", height: "unset", borderBottom: activeTab === index ? `3px solid ${colours.primary}` : "3px solid transparent" }}
						textStyle={{ fontSize: 12, color: activeTab === index ? colours.dynamicWhite : colours.grey }}
					/>
				))}
			</div>
			<div className="flex justify-center align-center" style={{ minWidth: "100%", width: "100%", marginTop: 8 }}>
				{tabs[activeTab] && tabs[activeTab].component}
			</div>
		</div>
	);
}