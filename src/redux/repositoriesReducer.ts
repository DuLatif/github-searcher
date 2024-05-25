import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { generateCacheKey } from "../utils/cacheKeyGenerator";
import { RootState } from "./store";
import {
  IGetRepositoriesParams,
  IGetRepositoriesResponse,
} from "@/interfaces/repository.interface";
import { getRepositories } from "@/services/repositories.service";

interface IRepositoryListState {
  results: Record<string, IGetRepositoriesResponse>;
  loading: boolean;
  error: string | null;
  cacheKey?: string;
}

const initialState: IRepositoryListState = {
  results: {},
  loading: false,
  error: null,
};

export const fetchRepositoryList = createAsyncThunk<
  { cacheKey: string; results: IGetRepositoriesResponse },
  IGetRepositoriesParams,
  { state: RootState }
>("repositoryList/fetchRepositoryList", async (params, { getState }) => {
  const cacheKey = generateCacheKey("/search/repositories", params);
  const cachedResults = getState().repositoryList.results[cacheKey];
  if (cachedResults) {
    return { cacheKey, results: cachedResults };
  }
  const results = await getRepositories(params);
  return { cacheKey, results };
});

const repositoryListSlice = createSlice({
  name: "repositoryList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRepositoryList.fulfilled,
        (
          state,
          action: PayloadAction<{
            cacheKey: string;
            results: IGetRepositoriesResponse;
          }>
        ) => {
          state.loading = false;
          state.results[action.payload.cacheKey] = action.payload.results;
          state.cacheKey = action.payload.cacheKey;
        }
      )
      .addCase(fetchRepositoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch results";
      });
  },
});

export default repositoryListSlice.reducer;
