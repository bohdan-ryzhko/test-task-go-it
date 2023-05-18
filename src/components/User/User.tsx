import sass from "./User.module.scss";
import { FC, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { Button, Follow } from "../Button/Button";
import { AppDispatch } from "../../types/AppDispatch";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollow } from "../../redux/operations";
import { handleFollowStatus } from "../../utils/handleFollowStatus";
import { selectFollowUsers } from "../../redux/selectors";

interface IUserProps {
	user: IUser
}

export const User: FC<IUserProps> = ({ user: { user, avatar, tweets, followers, id } }) => {
	const dispatch: AppDispatch = useDispatch();

	const followItems = useSelector(selectFollowUsers);
	const currentUser = followItems.find(user => user.id === id);

	const [followStatus, setFollowStatus] = useState<Follow>(currentUser?.status || "Follow");

	const onFollowStatus = (id: string) => {
		setFollowStatus(handleFollowStatus);
		dispatch(toggleFollow({ id, followStatus }));
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
