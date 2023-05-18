import { IUser } from "./IUser";
import { IFollowItems } from "./IFollowItems";

export interface IInitialState {
	items: IUser[],
	isLoad: boolean,
	error: null | any,
	followItems: IFollowItems[]
}
