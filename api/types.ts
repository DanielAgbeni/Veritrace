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
		id: string;
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

	export type ScanAnalyticsSummaryType = {
		totalScansToday: number;
		mostScannedBatch: string;
		avgScansPerBatch: number;
	};

	export type ScanAnalyticsTableItemType = {
		batchId: string;
		totalScans: number;
		lastScan: string;
		trend: string;
	};

	export type ScanAnalyticsResponseType = {
		message: string;
		data: {
			summary: ScanAnalyticsSummaryType;
			tableData: ScanAnalyticsTableItemType[];
		};
	};
	export type ActivityLogType = {
		id: string;
		action: string;
		type: 'create' | 'update' | 'delete';
		user: string;
		createdAt: string;
	};

	export type ActivityLogResponseType = {
		message: string;
		data: ActivityLogType[];
	};

	export type FraudAlertBatchDetailType = {
		_id: string;
		batchNumber: string;
	};

	export type FraudAlertType = {
		_id: string;
		companyId: string;
		batchId: FraudAlertBatchDetailType;
		severity: 'HIGH' | 'MEDIUM' | 'LOW';
		message: string;
		isResolved: boolean;
		createdAt: string;
		updatedAt: string;
		__v: number;
	};

	export type FraudAlertResponseType = {
		message: string;
		data: FraudAlertType[];
	};
}
