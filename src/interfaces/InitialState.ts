import { IUser } from "./User";

export interface IInitialState {
	items: IUser[],
	isLoad: boolean,
	error: null | any,
}