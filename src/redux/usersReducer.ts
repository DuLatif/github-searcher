import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { generateCacheKey } from "../utils/cacheKeyGenerator";
import { RootState } from "./store";
import {
  IGetUsersParams,
  IGetUsersResponse,
} from "@/interfaces/user.interface";
import { getUsers } from "@/services/users.service";

interface IUserListState {
  results: Record<string, IGetUsersResponse>;
  loading: boolean;
  error: string | null;
  cacheKey?: string;
}

const initialState: IUserListState = {
  results: {},
  loading: false,
  error: null,
};

export const fetchUserList = createAsyncThunk<
  { cacheKey: string; results: IGetUsersResponse },
  IGetUsersParams,
  { state: RootState }
>("userList/fetchUserList", async (params, { getState }) => {
  const cacheKey = generateCacheKey("/search/users", params);
  const cachedResults = getState().userList.results[cacheKey];
  if (cachedResults) {
    return { cacheKey, results: cachedResults };
  }
  const results = await getUsers(params);
  return { cacheKey, results };
});

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserList.fulfilled,
        (
          state,
          action: PayloadAction<{
            cacheKey: string;
            results: IGetUsersResponse;
          }>
        ) => {
          state.loading = false;
          state.results[action.payload.cacheKey] = action.payload.results;
          state.cacheKey = action.payload.cacheKey;
        }
      )
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch results";
      });
  },
});

export default userListSlice.reducer;
