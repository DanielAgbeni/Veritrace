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

	export type AuthResponseType = {
		message: string;
		token: string;
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
}
