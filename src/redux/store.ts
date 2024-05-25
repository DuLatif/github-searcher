import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import usersReducer from "./usersReducer";
import repositoriesReducer from "./repositoriesReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userList", "repositoryList"],
};

const rootReducer = combineReducers({
  userList: usersReducer,
  repositoryList: repositoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
