import { Colours, Decorations } from "javascript-console-styling";

export default function showConsoleWarning() {
	const warning = Colours.redBg("DO ") + Decorations.bright(Colours.redBg("NOT")) + Colours.redBg(" TYPE ANYTHING IN THE CONSOLE UNLESS YOU ABSOLUTELY KNOW WHAT YOU ARE DOING. IF SOMEONE TELLS YOU TO DO SOMETHING HERE, YOUR ACCOUNT CAN GET COMPROMISED.");
	console.log(`%cWARNING: DO NOT TYPE ANYTHING IN THE CONSOLE WINDOW UNLESS YOU ABSOLUTELY KNOW WHAT YOU ARE DOING.`, "font-size: 20px; color: red; font-weight: bold");
	console.log(warning);
}