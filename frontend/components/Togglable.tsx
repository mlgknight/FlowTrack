'use client';

import { useState, useImperativeHandle, type ReactNode, type Ref } from 'react';
import { Button } from '@/components/ui/button';

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
		<div className='togglable'>
			<div style={hideWhenVisible}>
				<Button className=' m-3 cursor-pointer' onClick={toggleVisibility}>{buttonLabel}</Button>
			</div>
			<div className='togglable-content' style={showWhenVisible}>
				{children}
				<Button className=' m-3 cursor-pointer' onClick={toggleVisibility}>
					cancel
				</Button>
			</div>
		</div>
	);
};

export default Togglable;
