import { useSelector } from "react-redux"
import { selectError, selectFollowStatus, selectFollowingItems, selectIsLoad, selectUsers } from "../../redux/selectors"

export const useUsers = () => {
	const users = useSelector(selectUsers);
	const isLoad = useSelector(selectIsLoad);
	const error = useSelector(selectError);
	const followStatus = useSelector(selectFollowStatus);
	const followingItems = useSelector(selectFollowingItems);

	return { users, isLoad, error, followStatus, followingItems }
}
