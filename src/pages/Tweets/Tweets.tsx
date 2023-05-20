import sass from "./Tweets.module.scss";
import { loaderStyles } from "../../utils/loaderStyles";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import { useUsers } from "../../hooks/useUsers/useUsers";
import { IUser } from "../../interfaces/IUser";
import { User } from "../../components/User/User";
import { SkeletonSchema } from "../../components/SkeletonSchema/SkeletonSchema";
import { Puff } from 'react-loader-spinner';
import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from "react-router-dom";

interface TweetsProps {
	page: number,
	setPage: Dispatch<SetStateAction<number>>;
}

const Tweets: FC<TweetsProps> = ({ page, setPage }) => {
	const { users, isLoad, followStatus } = useUsers();

	const { state } = useLocation();
	const backLinkRef = useRef(state?.from ?? "/");

	const filteredFollowUsers = users.filter(user => {
		switch (followStatus) {
			case "Follow":
				return user.status === "Follow";
			case "Following":
				return user.status === "Following";
			default:
				return user;
		}
	})

	return (
		<main className={sass.tweets}>
			<div className={sass.backLinkWrapper}>
			<Link className={sass.backLink} to={backLinkRef.current}><IoIosArrowBack color="#471ca9" size={30} /></Link>
			</div>
			{(isLoad && page === 1) && <SkeletonSchema />}
			<ul className={sass.tweetsList}>
				{
					(users.length > 0 && followStatus === "") &&
					users.map((user: IUser) => (
						<li className={sass.user} key={user.id}>
							<User user={user} />
						</li>
					))
				}
				{
					(users.length > 0 && followStatus !== "") &&
					filteredFollowUsers.map((user: IUser) => (
						<li className={sass.user} key={user.id}>
							<User user={user} />
						</li>
					))
				}
			</ul>
			{(isLoad && page > 1) && <Puff color="#471ca9" wrapperStyle={loaderStyles}/>}
			{users.length < 12 && <button className={sass.loadMore} onClick={() => setPage(prev => prev + 1)} >Load More</button>}
		</main>
	);
}

export default Tweets;
