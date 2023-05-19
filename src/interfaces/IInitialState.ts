import { IUser } from "./IUser";
import { IFollowItems } from "./IFollowItems";
import { Follow } from "../components/Button/Button";

export interface IInitialState {
	items: IUser[],
	isLoad: boolean,
	error: null | any,
	followItems: IFollowItems[],
	followStatus: Follow | "",
}
