import {
	createContext,
	useMemo,
	useState
} from "react";

export const localeContext = createContext();

export function LocaleProvider({
	children
}) {
	const [locale, setLocale] = useState("en");
	//const memoizedLocale = useMemo(() => locale, [locale]);

	const getApplicationLocale = () => {
		try {
			if (typeof window === "undefined") return setLocale('en');
			const localeSetting = localStorage.getItem('locale');

			if (localeSetting !== null) {
				setLocale(localeSetting);
			}
		} catch (e) {
			return;
		}
	};

	const setApplicationLocale = (locale) => {
		try {
			if (typeof window === "undefined") return setLocale(locale);
			localStorage.setItem('locale', locale);
			setLocale(locale);
		} catch (e) {
			return;
		}
	}

	const appText = useMemo(() => {
		//* console.log(locale)
		let text = {
			"Home": "HOME",
			"About": "ABOUT",
			"Credits": "Credits",
			"Add Your School": "ADD YOUR SCHOOL",

			"Login": "Login",
			"Settings": "Settings",
			"Download": "Download",
			"Sign Up": "Sign Up",
			"Log Out": "Log Out",
			"Date of export": "Date of export",

			"Instructions": "Instructions",
			"Language": "Language",
			"Theme": "Theme",

			"(Dark)": "(Dark)",
			"(Light)": "(Light)",
			"(Automatic)": "(Automatic)",
			"Choose Language": "Choose Language",

			"Username": "Username",
			"Email": "Email",
			"Password": "Password",

			"Student's Arabic Name": "Student's Arabic Name",
			"Student's English Name": "Student's English Name",

			"Teacher Accounts": "Teacher Accounts",
			"Class Data": "Class Data",
			"Logs": "Logs",
			"Data Export": "Data Export",
			"Statistics": "Statistics",
			"Preferences": "Preferences",

			"Attendance Submission": "Attendance Submission",
			"Class Creation": "Class Creation",
			"Class Editing": "Class Editing",

			"for": "for",
			"of": "of",

			"On Period": "On Period",
			"students present": "students present",
			"Total Students": "Total Students",

			"something went wrong:": "something went wrong:",

			"Year": "Year",
			"Class": "Class",

			"Information": "Information",
			"Personalization": "Personalization",
			"Account": "Account",

			"Select A Year": "Select A Year",
			"Select A Class": "Select A Class",
			"Select A Period": "Select A Period",
			"Edit Student": "Edit Student",
			"Select": "Select",

			"Continue": "Continue",
			"Import data from excel": "Import data from excel",
		}

		switch (locale) {
			case "ar":
				text = {
					"Home": "الرئيسية",
					"About": "عن",
					"Credits": "الاعتمادات",
					"Add Your School": "إضافة مدرسة",

					"Login": "تسجيل الدخول",
					"Settings": "الاعدادات",
					"Download": "تحميل",
					"Sign Up": "إنشاء حساب",
					"Log Out": "تسجيل الخروج",
					"Date of export": "تاريخ التصدير",

					"Instructions": "التعليمات",
					"Language": "اللغة",
					"Theme": "المظهر",

					"(Dark)": "(داكن)",
					"(Light)": "(فاتح)",
					"(Automatic)": "(تلقائي)",
					"Choose Language": "إختر اللغة",

					"Username": "اسم المستخدم",
					"Email": "البريد الالكتروني",
					"Password": "كلمة المرور",

					"Student's Arabic Name": "اسم الطالب العربي",
					"Student's English Name": "اسم الطالب الإنجليزي",

					"Teacher Accounts": "حسابات المعلمين",
					"Class Data": "بيانات الصفوف",
					"Logs": "السجلات",
					"Data Export": "استخراج البيانات",
					"Statistics": "الاحصاءات",
					"Preferences": "التفضيلات",

					"Attendance Submission": "تسجيل الحضور",
					"Class Creation": "انشاء الصف",
					"Class Editing": "تعديل الصف",

					"for": "لـ",
					"of": "طالب حاضر من أصل",

					"On Period": "في الحصة",
					"students present": "طالب",
					"Total Students": "طالب",

					"something went wrong:": "حدث خطأ:",

					"Year": "السنة",
					"Class": "الصف",

					"Information": "المعلومات",
					"Personalization": "التخصيص",
					"Account": "الحساب",

					"Select A Year": "إختر السنة",
					"Select A Class": "إختر الصف",
					"Select A Period": "إختر الحصة",
					"Edit Student": "تعديل الطالب",
					"Select": "إختر",

					"Continue": "متابعة",
					"Import data from excel": "استيراد البيانات من Excel",
				}
				break;

			case "de":
				text = {
					"Home": "Startseite",
					"About": "Über",
					"Credits": "Credits",
					"Add Your School": "Über die Schule registrieren",

					"Login": "Anmeldung",
					"Settings": "Einstellungen",
					"Download": "Download",
					"Sign Up": "Registrierung",
					"Log Out": "Ausloggen",
					"Date of export": "Datum der Export",

					"Instructions": "Anleitung",
					"Language": "Sprache",
					"Theme": "Thema",

					"(Dark)": "(Dunkel)",
					"(Light)": "(Hell)",
					"(Automatic)": "(Automatisch)",
					"Choose Language": "Sprache auswählen",

					"Username": "Benutzername",
					"Email": "E-Mail",
					"Password": "Passwort",

					"Student's Arabic Name": "Arabischer Name",
					"Student's English Name": "Englischer Name",

					"Teacher Accounts": "Lehrerkonten",
					"Class Data": "Klassen-Daten",
					"Logs": "Logs",
					"Data Export": "Daten exportieren",
					"Statistics": "Statistiken",
					"Preferences": "Einstellungen",

					"Attendance Submission": "Abschluss",
					"Class Creation": "Klasse erstellen",
					"Class Editing": "Klasse bearbeiten",

					"for": "f\u00fcr",
					"of": "von",

					"On Period": "Auf Perioden",
					"students present": "Sch\u00fcler anwesend",
					"Total Students": "Sch\u00fcler",

					"something went wrong:": "Etwas ist schief gelaufen:",

					"Year": "Jahr",
					"Class": "Klasse",

					"Select A Year": "Jahr auswählen",
					"Select A Class": "Klasse auswählen",
					"Select A Period": "Lehrstunde auswählen",
					"Edit Student": "Sch\u00fcler bearbeiten",
					"Select": "Auswählen",

					"Information": "Informationen",
					"Personalization": "Personalisierung",
					"Account": "Konto",

					"Continue": "Fortsetzen",
					"Import data from excel": "Daten aus Excel importieren",
				}
				break;
			
			default:
				break;
		}

		return text;
	}, [locale]);

	return (
		<localeContext.Provider
			value={{
				locale,
				getApplicationLocale,
				setApplicationLocale,
				appText
			}}
		>
			{children}
		</localeContext.Provider>
	);
}