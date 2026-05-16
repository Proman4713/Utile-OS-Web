import { useCallback, useRef, useState } from "react";

export function useStateCallback(initialState) {
	const [state, setState] = useState(initialState);
	const cbRef = useRef(null); // init mutable ref container for callbacks

	const setStateCallback = useCallback((newState, cb) => {
		cbRef.current = cb; // store current, passed callback in ref
		setState(prevState => {
			const updatedState = typeof newState === 'function' ? newState(prevState) : newState;
			// console.log('setStateCallback called', prevState, '->', updatedState);

			if (cbRef.current) {
				// console.log(cbRef.current, typeof cbRef.current)
				// setTimeout(() => {
					cbRef.current(updatedState);
					cbRef.current = null;
				// }, 0);
			}

			return updatedState;
		});
	}, []); // keep object reference stable, exactly like `useState`

	// useEffect(() => {
	// 	// cb.current is `null` on initial render, 
	// 	// so we only invoke callback on state *updates*
	// 	if (cbRef.current) {
	// 		console.log("Callback exists", state, cbRef.current);
	// 		cbRef.current(state);
	// 		cbRef.current = null; // reset callback after execution
	// 	} else {
	// 		console.log("No callback to execute", state);
	// 	}
	// }, [state,]);

	return [state, setStateCallback];
}