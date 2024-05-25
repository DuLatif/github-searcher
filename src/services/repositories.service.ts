import {
  IGetRepositoriesParams,
  IGetRepositoriesResponse,
} from "@/interfaces/repository.interface";
import api from "./api";

export const getRepositories = async (
  params: IGetRepositoriesParams
): Promise<IGetRepositoriesResponse> => {
  const response = await api.get<IGetRepositoriesResponse>(
    "/search/repositories",
    {
      params: params,
    }
  );

  return response.data;
};
