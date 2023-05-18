import sass from "./User.module.scss";
import { FC, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { Button, Follow } from "../Button/Button";
import { AppDispatch } from "../../types/AppDispatch";
import { useDispatch } from "react-redux";
import { toggleFollow } from "../../redux/operations";

interface IUserProps {
	user: IUser
}

export const User: FC<IUserProps> = ({ user: { user, avatar, tweets, followers, id } }) => {
	
	const dispatch: AppDispatch = useDispatch();

	const [followStatus, setFollowStatus] = useState<Follow>("Follow");

	const onFollowStatus = (id: string) => {
		dispatch(toggleFollow({ id, followStatus }));
		setFollowStatus(prev => {
			switch (prev) {
				case "Follow":
					return "Following";
				case "Following":
					return "Follow"
				default:
					return "Follow"
			}
		})
	}

	return (
		<div>
			<div className={sass.avatar}>
				<img width={62} height={62} src={avatar} alt={user} />
			</div>
			<p className={sass.user}>{user}</p>
			<p className={sass.tweets}>{tweets} <span>tweets</span></p>
			<p className={sass.followers}>{followers} <span>followers</span></p>
			<Button status={followStatus} onClick={() => onFollowStatus(id)} />
		</div>
	)
}
