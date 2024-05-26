import {
  IGetRepositoriesParams,
  IGetRepositoriesResponse,
} from "@/interfaces/repository.interface";
import api from "./api";
import { calculateTotalPages } from "@/utils/calculateTotalPages";

export const getRepositories = async (
  params: IGetRepositoriesParams
): Promise<IGetRepositoriesResponse> => {
  const response = await api.get<IGetRepositoriesResponse>(
    "/search/repositories",
    {
      params: params,
    }
  );

  return {
    ...response.data,
    total_page: calculateTotalPages(response.data.total_count, params.per_page),
  };
};
