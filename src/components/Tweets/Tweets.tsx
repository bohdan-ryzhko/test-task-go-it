import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/operations";
import { useUsers } from "../../hooks/useUsers/useUsers";
import { IUser } from "../../interfaces/User";

type AppDispatch = ThunkDispatch<RTCIceConnectionState, unknown, AnyAction>;

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
			<ul>
				{
					users.length > 0 &&
					users.map(
						(user: IUser) =>
							<li key={user.id}>
								<img width={30} height={30} src={user.avatar} alt={user.user} />
								<p>{user.user}</p>
							</li>
					)
				}
			</ul>
			{
				users.length < 12 &&
				<button onClick={onLoadMore}>Load More</button>
			}
		</>
	)
}
