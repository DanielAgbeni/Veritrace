import api from "@/api";


export const signinUser = async (formData: FormData) => {
	try {
		const response = await api.post(`/api/v1/sign-in`, formData);
		return response.data;
	} catch (err: any) {
		throw new Error(
			err.response?.data?.message || err.message || 'Server error',
		);
	}
};

export const signupUser = async (formData: FormData) => {
	try {
		const response = await api.post(`/api/v1/sign-up`, formData);
		return response.data;
	} catch (err: any) {
		throw new Error(
			err.response?.data?.message || err.message || 'Server error',
		);
	}
};
