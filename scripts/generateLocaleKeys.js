import * as fs from "fs";
import path from "path";

const localePath = path.join(".", "app/assets/lang");
const availableLocales = fs.readdirSync(localePath).filter(k => !k.includes("en"))
const enLocaleFile = fs.readFileSync(path.join(localePath, "en.json"), "utf-8")
const enLocaleJson = JSON.parse(enLocaleFile)

for (const locale of availableLocales) {
	const localeJson = JSON.parse(fs.readFileSync(path.join(localePath, locale)))
	let newJson = { ...localeJson };
	for (const key of Object.keys(enLocaleJson)) {
		if (!Object.keys(localeJson).includes(key)) {
			newJson[key] = ""
		}
	}
	console.log(newJson, locale)
	fs.writeFileSync(path.join(localePath, locale), JSON.stringify(newJson, null, 4))
}