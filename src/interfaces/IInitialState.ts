import { IUser } from "./IUser";

export interface IInitialState {
	items: IUser[],
	isLoad: boolean,
	error: null | any,
	followUser: IUser | null,
}
