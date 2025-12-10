import api from "@/api";

export type ProductionBatchRequestType = {
    flourBatchId: string;
    bakingStartTime: string;
    bakingEndTime: string;
    ovenTemp: number;
    batchNumber: string;
    quantityProduced: number;
};

export const createProductionBatch = async (
    data: ProductionBatchRequestType
): Promise<any> => {
    const response = await api.post('/api/v1/company/productionbatches', data);
    return response.data;
};
