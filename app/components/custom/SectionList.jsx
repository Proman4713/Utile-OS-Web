import { useEffect, useRef, useState } from "react";

/**
 * SectionList Component for ReactJS (mimicking React Native's SectionList)
 * 
 * @param {{
 *   sections: { title: string, data: any[] }[],
 *   renderItem: ({ item: any, index: number, section: object }) => JSX.Element,
 *   renderSectionHeader?: ({ section: object }) => JSX.Element,
 *   contentContainerStyle?: import("react").CSSProperties,
 *   ListEmptyComponent?: JSX.Element,
 *   keyExtractor?: (item: any, index: number) => string | number
 * }} props
 * @returns JSX.Element
 */
export default function SectionList({ sections, renderItem, renderSectionHeader = () => null, contentContainerStyle = {}, ListEmptyComponent = null, keyExtractor = (item, index) => index }) {
	const [visibleItems, setVisibleItems] = useState(20);
	const listRef = useRef(null);

	const loadMoreItems = () => {
		setVisibleItems((prev) => prev + 10); // Load 10 more items on each scroll
	};

	// Simulate lazy loading when scrolling to the bottom
	const handleScroll = (e) => {
		if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight * 0.95) {
			loadMoreItems();
		}
	};

	useEffect(() => {
		const listElement = listRef.current;
		if (listElement) {
			listElement.addEventListener('scroll', handleScroll);
		}
		return () => listElement?.removeEventListener('scroll', handleScroll);
	}, []);

	const [flattenedData, setFlattenedData] = useState([]);

	// useEffect(() => {
	// 	console.log(sections, "originalData");
	// 	const example = [{
	// 		title: "Text",
	// 		data: ["bob", "bob", "bob"]
	// 	}]
	// }, [])

	return (
		<div ref={listRef} style={{ height: "80%", overflowY: 'auto', display: "flex", flexDirection: "column", ...contentContainerStyle }}>
			{flattenedData.length === 0 && ListEmptyComponent
				? ListEmptyComponent
				: sections.slice(0, visibleItems).map((section) => (
					<>
						{renderSectionHeader({ section })}
						{section.data.map((item, index) => (
							<div key={keyExtractor(item, index)}>{renderItem({ item, index, section })}</div>
						))}
					</>
					// item.isHeader ? (
					// 	<div key={`header-${index}`} style={{ fontWeight: "bold", padding: "10px 0" }}>
					// 		{renderSectionHeader({ section: { title: item.title } })}
					// 	</div>
					// ) : (
					// 	<div key={keyExtractor(item, index)}>{renderItem({ item, index, section: {} })}</div>
					// )
				))}
		</div>
	);
};