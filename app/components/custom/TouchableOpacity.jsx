import { forwardRef, useRef, useState } from 'react';

/**
 * 
 * @param {import("react").ButtonHTMLAttributes & {children: ReactNode, style: import('react').CSSProperties, className: string, onPress: (event: import('react').MouseEvent) => void, onLongPress: (event: import('react').MouseEvent) => void, activeOpacity: number, hoverOpacity: number, disabled: boolean, disabledOpacity: number, delay: number, onMouseDown: (event: import('react').MouseEvent) => void, onMouseUp: (event: import('react').MouseEvent) => void, onMouseEnter: (event: import('react').MouseEvent) => void, onMouseLeave: (event: import('react').MouseEvent) => void}} props
 */
export default function TouchableOpacity({
	children,
	style,
	className="",
	onPress=() => {},
	onLongPress = null,
	activeOpacity = 0.2,
	hoverOpacity = 0.8,
	disabled = false,
	disabledOpacity = 0.4,
	delay = 300, // Time threshold for double-click detection
	onMouseDown = () => {},
	onMouseUp = () => {},
	onMouseEnter = () => {},
	onMouseLeave = () => {},
	ref,
	...props
}) {
	const [isPressed, setIsPressed] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const clickTimeout = useRef(null); // Ref to manage click delay

	const handleMouseDown = (ev) => { setIsPressed(true); onMouseDown(ev); }; // Press state
	const handleMouseUp = (ev) => { setIsPressed(false); onMouseUp(ev); }; // Release state
	const handleMouseEnter = (ev) => { setIsHovered(true); onMouseEnter(ev); }; // Hover state
	const handleMouseLeave = (ev) => {
		setIsHovered(false);
		setIsPressed(false);
		onMouseLeave(ev);
	}; // Reset hover and press

	const mergedStyle = {
		border: "none",
		outline: "none",
		opacity: disabled
			? disabledOpacity
			: isPressed
				? activeOpacity
				: isHovered
					? hoverOpacity
					: 1, // Opacity based on state
		cursor: disabled ? 'not-allowed' : 'pointer', // Disable pointer interactions if disabled
		transition: 'opacity 0.2s', // Smooth transition
		...style
	};

	const handleClick = (ev) => {
		if (disabled) return;

		if (onLongPress) {
			// Clear timeout if double-click occurs
			if (clickTimeout.current) {
				clearTimeout(clickTimeout.current);
				clickTimeout.current = null;
				return; // Do not trigger onPress
			}

			// Wait to confirm if it's a single or double click
			clickTimeout.current = setTimeout(() => {
				onPress(ev);
				clickTimeout.current = null;
			}, delay);
		} else {
			onPress(ev);
		}
	};

	const handleDoubleClick = (ev) => {
		if (disabled) return;

		if (onLongPress) {
			clearTimeout(clickTimeout.current); // Cancel single click action
			clickTimeout.current = null;
			onLongPress(ev); // Trigger double-click as onLongPress
		}
	};

	return (
		<button
			style={mergedStyle}
			className={className + (className ? " " : "") + "touchable-opacity"}
			disabled={disabled}
			onMouseDown={ev => handleMouseDown(ev)}
			onMouseUp={ev => handleMouseUp(ev)}
			onMouseEnter={ev => handleMouseEnter(ev)}
			onMouseLeave={ev => handleMouseLeave(ev)}
			onClick={ev => handleClick(ev)}
			onDoubleClick={ev => handleDoubleClick(ev)}
			ref={ref}
			{...props}
		>
			{children}
		</button>
	);
};