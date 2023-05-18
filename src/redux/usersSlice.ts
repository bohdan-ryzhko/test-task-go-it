import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./operations";
import { IInitialState } from "../interfaces/InitialState";

const initialState: IInitialState = {
	items: [],
	isLoad: false,
	error: null,
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
	}
});

export const usersReducer = usersSlice.reducer;