export default function hexToRgb(hexString="#FFFFFF", returnArray=false) {
	const hex = hexString.replace("#", "");
	if (hex.length > 8) return "rgba(255, 0, 0, 255)";

	const allowedChars = "0123456789ABCDEF";

	for (const char of hex) {
		if (allowedChars.includes(char.toUpperCase()) === false) return "rgba(255, 0, 0, 255)";
	}

	const hexR = hex.slice(0, 2);
	const hexG = hex.slice(2, 4);
	const hexB = hex.slice(4, 6);
	const hexA = hex.slice(6, 8);

	const R = Number(`0x${hexR}`);
	const G = Number(`0x${hexG}`);
	const B = Number(`0x${hexB}`);
	const A = Number(`0x${hexA}`);

	if (returnArray) return [R, G, B, A];

	return `rgba(${R}, ${G}, ${B}${!isNaN(A) ? `, ${A}` : ", 255"})`
}