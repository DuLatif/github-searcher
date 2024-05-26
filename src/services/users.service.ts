import {
  IGetUsersParams,
  IGetUsersResponse,
} from "@/interfaces/user.interface";
import api from "./api";
import { calculateTotalPages } from "@/utils/calculateTotalPages";

export const getUsers = async (
  params: IGetUsersParams
): Promise<IGetUsersResponse> => {
  const response = await api.get<IGetUsersResponse>("/search/users", {
    params: params,
  });

  return {
    ...response.data,
    total_page: calculateTotalPages(response.data.total_count, params.per_page),
  };
};
