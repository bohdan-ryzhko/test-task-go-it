import { Follow } from "../components/Button/Button";

export interface IUser {
	user: string,
	tweets: number,
	followers: number,
	avatar: string,
	status: Follow;
	id: string,
}
