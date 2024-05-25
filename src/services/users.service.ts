import {
  IGetUsersParams,
  IGetUsersResponse,
} from "@/interfaces/user.interface";
import api from "./api";

export const getUsers = async (
  params: IGetUsersParams
): Promise<IGetUsersResponse> => {
  const response = await api.get<IGetUsersResponse>("/search/users", {
    params: params,
  });

  return response.data;
};
