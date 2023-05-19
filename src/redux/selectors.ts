import { IInitialState } from "../interfaces/IInitialState";

interface IState {
	users: IInitialState;
}

export const selectUsers = (state: IState) => state.users.items;
export const selectIsLoad = (state: IState) => state.users.isLoad;
export const selectError = (state: IState) => state.users.error;
export const selectFollowUsers = (state: IState) => state.users.followItems;
export const selectFollowStatus = (state: IState) => state.users.followStatus;
