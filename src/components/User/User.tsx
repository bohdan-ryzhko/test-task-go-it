import sass from "./User.module.scss";
import picture from "../../images/picture.png";
import { FC, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { Button, Follow } from "../Button/Button";
import { AppDispatch } from "../../types/AppDispatch";
import { useDispatch } from "react-redux";
import { toggleFollow } from "../../redux/operations";
import { handleFollowStatus } from "../../utils/handleFollowStatus";
import { useUsers } from "../../hooks/useUsers/useUsers";
import { addComma } from "../../utils/addComma";

interface IUserProps {
	user: IUser
}

export const User: FC<IUserProps> = ({ user: { user, avatar, tweets, followers, id } }) => {
	const dispatch: AppDispatch = useDispatch();
	const { followingItems } = useUsers();
	const currentUser = followingItems.find(user => user.id === id);

	const [followStatus, setFollowStatus] = useState<Follow>(currentUser?.status || "Follow");

	const onFollowStatus = (id: string) => {
		setFollowStatus(handleFollowStatus);
		dispatch(toggleFollow({ id, followStatus }));
	}

	return (
		<div className={sass.userInner}>
			<div className={sass.picture}>
				<img width={308} height={168} src={picture} alt="Decorative" />
			</div>
			<div className={sass.avatar}>
				<span className={sass.left} />
				<img height={62} src={avatar} alt={user} />
				<span className={sass.right} />
			</div>
			<p className={sass.user}>{user}</p>
			<p className={sass.tweets}>{addComma(tweets)} <span>tweets</span></p>
			<p className={sass.followers}>{addComma(followers)} <span>followers</span></p>
			<Button status={followStatus} onClick={() => onFollowStatus(id)} />
		</div>
	)
}
