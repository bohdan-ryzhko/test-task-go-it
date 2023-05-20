import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, toggleFollow } from "./operations";
import { IInitialState } from "../interfaces/IInitialState";
import { Follow } from "../components/Button/Button";
import { IUser } from "../interfaces/IUser";

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
			.addCase(fetchUsers.pending, (state) => {
				state.isLoad = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.isLoad = false;
				state.error = null;
				state.items.push(...action.payload.map((user: IUser) => ({ ...user, status: "Follow" })));
				for (let i = 0; i < state.items.length; i++) {
					const item = state.items[i];
					for (let k = 0; k < state.followingItems.length; k++) {
						const followingItem = state.followingItems[k];
						if (followingItem.id === item.id) {
							item.status = followingItem.status;
						}
					}
				}
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.isLoad = false;
				state.error = action.payload;
			})
			.addCase(toggleFollow.fulfilled, (state, action) => {
				state.error = null;
				const findFollowIndex = state.items.findIndex(({ id }) => id === action.payload.data.id);
				const defineFollowStatus: Follow = action.payload.status === "Follow" ? "Following" : "Follow";

				if (defineFollowStatus === "Following") {
					state.followingItems.push({ ...state.items[findFollowIndex], status: "Following" })
				} else {
					state.followingItems.splice(findFollowIndex, 1);
				}

				state.items.splice(findFollowIndex, 1, { ...action.payload.data, status: defineFollowStatus });
			})
			.addCase(toggleFollow.rejected, (state, action) => {
				state.isLoad = false;
				state.error = action.payload;
			})
	}
});

export const { setFollowStatus } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;