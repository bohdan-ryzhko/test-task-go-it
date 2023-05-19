import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, toggleFollow } from "./operations";
import { IInitialState } from "../interfaces/IInitialState";
import { Follow } from "../components/Button/Button";

const initialState: IInitialState = {
	items: [],
	isLoad: false,
	error: null,
	followItems: [],
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
			.addCase(toggleFollow.fulfilled, (state, action) => {
				state.isLoad = false;
				state.error = null;
				const findFollowIndex = state.items.findIndex(({ id }) => id === action.payload.data.id);
				state.items.splice(findFollowIndex, 1, action.payload.data);
				const drfineFollowStatus: Follow = action.payload.status === "Follow" ? "Following" : "Follow";

				if (findFollowIndex > -1) {
					const findPersistIndex = state.items.findIndex(({ id }) => id === action.payload.data.id);
					state.followItems.splice(findPersistIndex, 1, { id: state.items[findFollowIndex].id, status: drfineFollowStatus });
					return;
				}

				state.followItems.push({ id: state.items[findFollowIndex].id, status: drfineFollowStatus });
			})
			.addCase(toggleFollow.rejected, (state, action) => {
				state.isLoad = false;
				state.error = action.payload;
			})
	}
});

export const { setFollowStatus } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;