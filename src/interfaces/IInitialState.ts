import { IUser } from "./IUser";
import { Follow } from "../components/Button/Button";

export interface IInitialState {
	items: IUser[],
	isLoad: boolean,
	error: null | any,
	followingItems: IUser[],
	followStatus: Follow | "",
}
