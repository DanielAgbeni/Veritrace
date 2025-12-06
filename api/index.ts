import axios, { AxiosRequestConfig } from 'axios';

const controller = new AbortController();

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';

const api = axios.create({
	baseURL,
	signal: controller.signal,
});

api.interceptors.request.use((config) => {
	const token =
		typeof window !== 'undefined'
			? localStorage.getItem('accessToken')
			: null;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const setHeaderAuthorization: (token?: string) => void = (token) => {
		if (token) {
			api.defaults.headers.common.Authorization = `Bearer ${token}`;
		} else {
			api.defaults.headers.common.Authorization = undefined;
		}
	},
	postData: <T, D>(
		url: string,
		data?: T | undefined,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<D> = (url, data, options) => {
		return api.post(url, data, options);
	},
	getData: <T>(
		url: string,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<T> = (url, options) => {
		return api.get(url, options);
	},
	putData: <T, D>(
		url: string,
		data: T | undefined,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<D> = (url, data, options) => {
		return api.put(url, data, options);
	},
	patchData: <T, D>(
		url: string,
		data: T | undefined,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<D> = (url, data, options) => {
		return api.patch(url, data, options);
	},
	deleteData: <T>(
		url: string,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<T | undefined> = (url, options) => {
		return api.delete(url, options);
	},
	abortOutgoingRequest = () => {
		controller.abort();
	};

export default api;
