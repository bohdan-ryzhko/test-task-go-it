import { IInitialState } from "../interfaces/InitialState";

interface IState {
	users: IInitialState;
}

export const selectUsers = (state: IState) => state.users.items;
export const selectIsLoad = (state: IState) => state.users.isLoad;
export const selectError = (state: IState) => state.users.error;
