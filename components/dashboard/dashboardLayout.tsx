import React from 'react';
import DashboardSideBar from './dashSidebar';
import MainContainer from '../general/maincontainer';

const DashboarsLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex">
			<aside className="w-64">
				<DashboardSideBar />
			</aside>
			<MainContainer className="flex flex-col gap-4 w-full">
				{children}
			</MainContainer>
		</div>
	);
};

export default DashboarsLayout;
