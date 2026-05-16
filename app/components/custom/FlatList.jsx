import { useEffect, useState } from "react";

/**
 * 
 * @param {{ data: [], renderItem: import("react").Component, contentContainerStyle: import("react").CSSProperties }} param0 
 * @returns 
 */
export default function FlatList({ data, renderItem, contentContainerStyle = {}, ListEmptyComponent, keyExtractor = (item, index) => index }) {
	const [visibleItems, setVisibleItems] = useState(20); // Start by showing 10 items

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
		const listElement = document.getElementById('flatlist');
		listElement.addEventListener('scroll', handleScroll);
		return () => listElement.removeEventListener('scroll', handleScroll); // Cleanup event listener
	}, []);

	return (
		<div id="flatlist" style={{ height: "80%", overflowY: 'auto', display: "flex", flexDirection: "column", ...contentContainerStyle }}>
			{data.length === 0 && ListEmptyComponent
				? ListEmptyComponent
				: data.slice(0, visibleItems).map((item, index) => (
					<div key={keyExtractor(item, index)}>{renderItem({ item, index })}</div>
				))}
		</div>
	);
};