import React from 'react';
import DashboardSideBar from './dashSidebar';
import MainContainer from '../general/maincontainer';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-screen bg-gray-50">
			<DashboardSideBar />
			<MainContainer className="flex-1 flex flex-col overflow-y-auto w-full">
				{children}
			</MainContainer>
		</div>
	);
};

export default DashboardLayout;
