import BlogCard from "../../components/UI/BlogCard";
import Header from "../../components/UI/Header";
import I18NText from "../../components/UI/I18NText";
import Section from "../../components/UI/Section";

/**
 * @type {import('react-router').MetaFunction}
 */
export const meta = () => [
	{ title: 'The Utile OS blog' }
];

export default function Blog() {
	return (
		<>
			<meta property='og:title' content='The Utile OS blog' />
			<meta property='twitter:title' content='The Utile OS blog' />
			<meta property='og:description' content={`Utile OS ${import.meta.env.VITE_APP_OS_VERSION || '26'} — The minimum-friction Linux desktop`} />
			<meta name='description' content={`Utile OS ${import.meta.env.VITE_APP_OS_VERSION || '26'} — The minimum-friction Linux desktop`} />

			<Header />
			<Section>
				<I18NText mode="brand" className="homepage-text">The Utile OS blog</I18NText>
				<div id="featured-articles" className="flex-cmn sub-spacing">
					<I18NText mode="regular" className="homepage-text subtitle">Featured Articles:</I18NText>
					<div className="flex-row justify-space-around">
						{/* <BlogCard
							title="Utile OS 26 is released"
							author="Utile"
							date={new Date("2025-02-24T18:46:18.417Z")}
							id="utile-os-26-is-released"
						/> */}
					</div>
				</div>
			</Section>
		</>
	);
}