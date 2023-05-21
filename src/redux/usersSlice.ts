import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, toggleFollow } from "./operations";
import { IInitialState } from "../interfaces/IInitialState";
import {
	handleFetchUsersFulfilled,
	handleFetchUsersPending,
	handleFetchUsersRejected,
	handleToggleFollowFulfilled,
	handleToggleFollowRejected
} from "./handlers";

const initialState: IInitialState = {
	items: [],
	isLoad: false,
	error: null,
	followingItems: [],
	followStatus: ""
}

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setFollowStatus: (state, action) => {
			state.followStatus = action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, handleFetchUsersPending)
			.addCase(fetchUsers.fulfilled, handleFetchUsersFulfilled)
			.addCase(fetchUsers.rejected, handleFetchUsersRejected)
			.addCase(toggleFollow.fulfilled, handleToggleFollowFulfilled)
			.addCase(toggleFollow.rejected, handleToggleFollowRejected)
	}
});

export const { setFollowStatus } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;