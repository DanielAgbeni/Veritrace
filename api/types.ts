import { AxiosError, AxiosResponse } from 'axios';

declare global {
	export type MetaType = {
		nextLink: string | null;
		previousLink: string | null;
		presentLink: string | null;
	};

	export type PaginationType = {
		presentPage: number;
		total: number;
		limit: number;
		previousPage: number | null;
		nextPage: number | null;
		totalPage: number;
	};

	export type CompanyType = {
		_id: string;
		name: string;
		mail: string;
		address: string;
		description: string;
		logo: string;
	};

	export type AuthResponseType = {
		message: string;
		token: string;
		company: CompanyType;
	};

	export type ResultPaginationType = {
		meta: MetaType;
		pagination: PaginationType;
	};

	export type AuthDetailsType = {
		type: 'Bearer';
		token: string;
	};

	export type ApiCallResponseType<T> = {
		data: T;
	} & ResultPaginationType;

	export type ErrorResponseType = {
		message?: string;
		errors?: {
			[name: string]: string;
		};
	};

	export type ApiRequestResponseType<T> = Promise<AxiosResponse<T>>;

	export type ApiErrorResponseType = AxiosError<ErrorResponseType>;

	export type DashboardStatsType = {
		flourBatches: number;
		productionBatches: number;
		totalScans: number;
	};

	export type DashboardResponseType = {
		success: boolean;
		message: string;
		data: DashboardStatsType;
	};

	export type FlourBatchType = {
		_id: string;
		flourType: string;
		supplier: string;
		batchNumber: string;
		date: string;
	};

	export type FlourBatchResponseType = {
		success: boolean;
		message: string;
		data: FlourBatchType[];
	};

	export type FlourBatchUploadRequest = {
		flourType: string;
		supplier: string;
		batchNumber: string;
	};

	export type ProductionBatchFlourDetailType = {
		_id: string;
		flourType: string;
		supplier: string;
		batchNumber: string;
	};

	export type ProductionBatchType = {
		id: string;
		flourBatchId: ProductionBatchFlourDetailType;
		bakingStartTime: string;
		bakingEndTime: string;
		ovenTemp: number;
		batchNumber: string;
	};

	export type ProductionBatchResponseType = {
		message: string;
		data: ProductionBatchType[];
	};
}
