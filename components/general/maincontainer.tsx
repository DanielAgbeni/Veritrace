import React, { forwardRef } from 'react';

export type MainContainerProps = React.PropsWithChildren<{
	className?: string;

	maxW?: string;
	
	as?: React.ElementType;
}>;


const MainContainer = forwardRef<HTMLElement, MainContainerProps>(
	({ children, className = '', maxW = 'max-w-7xl', as: Component = 'main' as React.ElementType }, ref) => {
		const containerClass = `w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxW} ${className}`.trim();

		return (
			<Component ref={ref as any} className={containerClass}>
				{children}
			</Component>
		);
	}
);

MainContainer.displayName = 'MainContainer';

export default MainContainer;
export { MainContainer };

