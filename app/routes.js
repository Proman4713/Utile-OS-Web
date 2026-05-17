import { index, route } from "@react-router/dev/routes";

export default [
	index("routes/static/Home.jsx"),
	route("/about", "routes/static/About.jsx"),
	route("/download", "routes/static/Download.jsx")
];
