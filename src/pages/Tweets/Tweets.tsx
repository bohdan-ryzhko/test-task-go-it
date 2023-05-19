import sass from "./Tweets.module.scss";
import { loaderStyles } from "../../utils/loaderStyles";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/operations";
import { useUsers } from "../../hooks/useUsers/useUsers";
import { IUser } from "../../interfaces/IUser";
import { User } from "../../components/User/User";
import { AppDispatch } from "../../types/AppDispatch";
import { SkeletonSchema } from "../../components/SkeletonSchema/SkeletonSchema";
import { Puff } from 'react-loader-spinner';
import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from "react-router-dom";

const Tweets: FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const { users, isLoad } = useUsers();
	const [page, setPage] = useState<number>(1);
	const [limit] = useState<number>(3);

	const { state } = useLocation();
	const backLinkRef = useRef(state?.from ?? "/");

	useEffect(() => {
		const controller: AbortController = new AbortController();
		dispatch(fetchUsers({ page, limit, controller }));

		return () => {
			controller.abort();
		}
	}, [page, limit, dispatch]);

	const onLoadMore = () => setPage(prev => prev + 1);

	return (
		<main className={sass.tweets}>
			<div className={sass.backLinkWrapper}>
				<Link className={sass.backLink} to={backLinkRef.current}><IoIosArrowBack color="#471ca9" size={30} /></Link>
			</div>
			{
				(isLoad && page === 1) &&
				<SkeletonSchema />
			}
			<ul className={sass.tweetsList}>
				{
					users.length > 0 &&
					users.map(
						(user: IUser) =>
							<li className={sass.user} key={user.id}><User user={user} /></li>
					)
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
		</main>
	)
}

export default Tweets;