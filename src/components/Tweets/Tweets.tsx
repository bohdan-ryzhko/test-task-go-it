import sass from "./Tweets.module.scss";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/operations";
import { useUsers } from "../../hooks/useUsers/useUsers";
import { IUser } from "../../interfaces/IUser";
import { User } from "../User/User";
import { AppDispatch } from "../../types/AppDispatch";

export const Tweets: FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const { users } = useUsers();
	const [page, setPage] = useState<number>(1);
	const [limit] = useState<number>(3);

	useEffect(() => {
		const controller: AbortController = new AbortController();
		dispatch(fetchUsers({ page, limit, controller }));

		return () => {
			controller.abort();
		}
	}, [page, limit, dispatch]);

	const onLoadMore = () => setPage(prev => prev + 1);

	return (
		<>
			<ul className={sass.tweets}>
				{
					users.length > 0 &&
					users.map((user: IUser) => <li className={sass.user} key={user.id}><User user={user} /></li>)
				}
			</ul>
			{
				users.length < 12 &&
				<button className={sass.loadMore} onClick={onLoadMore}>Load More</button>
			}
		</>
	)
}
