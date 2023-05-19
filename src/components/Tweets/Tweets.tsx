import sass from "./Tweets.module.scss";
import { loaderStyles } from "../../utils/loaderStyles";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/operations";
import { useUsers } from "../../hooks/useUsers/useUsers";
import { IUser } from "../../interfaces/IUser";
import { User } from "../User/User";
import { AppDispatch } from "../../types/AppDispatch";
import { SkeletonSchema } from "../SkeletonSchema/SkeletonSchema";
import { Puff } from 'react-loader-spinner';

export const Tweets: FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const { users, isLoad } = useUsers();
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
			{
				(isLoad && page === 1) &&
				<SkeletonSchema />
			}
			<ul className={sass.tweets}>
				{
					users.length > 0 &&
					users.map((user: IUser) => <li className={sass.user} key={user.id}><User user={user} /></li>)
				}
			</ul>
			{
				(isLoad && page > 1) &&
				<Puff color="#471ca9" wrapperStyle={loaderStyles}/>
			}
			{
				users.length < 12 &&
				<button className={sass.loadMore} onClick={onLoadMore}>Load More</button>
			}
		</>
	)
}
