import api from "@/api";

export const uploadFlourBatch = async (
	data: FlourBatchUploadRequest
): Promise<any> => {
	const response = await api.post('/api/v1/company/flourbatches', data);
	return response.data;
};
