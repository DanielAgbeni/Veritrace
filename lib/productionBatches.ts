import api from "@/api";

export type ProductionBatchRequestType = {
    flourBatchId: string;
    bakingTime: number;
    ovenTemp: number;
    bakingEndTime: string;
    bakingMakeTime: string;
};

export const createProductionBatch = async (
    data: ProductionBatchRequestType
): Promise<any> => {
    const response = await api.post('/api/v1/company/create_production_batch', data);
    return response.data;
};
