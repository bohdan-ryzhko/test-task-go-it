import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, toggleFollow } from "./operations";
import { IInitialState } from "../interfaces/IInitialState";

const initialState: IInitialState = {
	items: [],
	isLoad: false,
	error: null,
	followUser: null
}

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.isLoad = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.isLoad = false;
				state.error = null;
				state.items.push(...action.payload);
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.isLoad = false;
				state.error = action.payload;
			})
			.addCase(toggleFollow.pending, state => {
				state.isLoad = true;
			})
			.addCase(toggleFollow.fulfilled, (state, action) => {
				state.isLoad = false;
				state.error = null;
				const findFollowUser = state.items.findIndex(({ id }) => id === action.payload.id);
				state.items.splice(findFollowUser, 1, action.payload);
			})
			.addCase(toggleFollow.rejected, (state, action) => {
				state.isLoad = false;
				state.error = action.payload;
			})
	}
});

export const usersReducer = usersSlice.reducer;