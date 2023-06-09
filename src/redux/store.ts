import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./usersSlice";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['followingItems'],
}

const persistedReducer = persistReducer(persistConfig, usersReducer);

export const store = configureStore({
	reducer: {
		users: persistedReducer,
	},
	middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware({
		serializableCheck: {
		ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);