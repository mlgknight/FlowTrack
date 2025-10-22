'use client';

import {
	useState,
	useImperativeHandle,
	type ReactNode,
	type Ref,
} from 'react';


export interface TogglableHandle {
	toggleVisibility: () => void;
}

interface TogglableProps {
	buttonLabel: string;
	children: ReactNode;
	ref?: Ref<TogglableHandle>;
}

const Togglable = ({ buttonLabel, children, ref }: TogglableProps) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		};
	});

	return (
		<div className="togglable">
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			<div className="togglable-content" style={showWhenVisible}>
				{children}
				<button className="cancel-btn" onClick={toggleVisibility}>
					cancel
				</button>
			</div>
		</div>
	);
};

export default Togglable;