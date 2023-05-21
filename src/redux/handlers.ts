import { Follow } from "../components/Button/Button";
import { IInitialState } from "../interfaces/IInitialState";
import { IUser } from "../interfaces/IUser";

export const handleFetchUsersPending = (state: IInitialState) => {
	state.isLoad = true;
}

export const handleFetchUsersFulfilled = (state:IInitialState, action:any) => {
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
}

export const handleFetchUsersRejected = (state:IInitialState, action:any) => {
	state.isLoad = false;
	state.error = action.payload;
}

export const handleToggleFollowFulfilled = (state:IInitialState, action:any) => {
	state.error = null;
	const findFollowIndex = state.items.findIndex(({ id }) => id === action.payload.data.id);
	const defineFollowStatus: Follow = action.payload.status === "Follow" ? "Following" : "Follow";
	state.items.splice(findFollowIndex, 1, { ...action.payload.data, status: defineFollowStatus });
	state.followingItems = state.items.filter(({ status }) => status === "Following");
}

export const handleToggleFollowRejected = (state:IInitialState, action:any) => {
	state.isLoad = false;
	state.error = action.payload;
}
