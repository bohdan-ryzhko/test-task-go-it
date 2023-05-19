import { useSelector } from "react-redux"
import { selectError, selectFollowUsers, selectIsLoad, selectUsers } from "../../redux/selectors"

export const useUsers = () => {
	const users = useSelector(selectUsers);
	const isLoad = useSelector(selectIsLoad);
	const error = useSelector(selectError);
	const followItems = useSelector(selectFollowUsers);

	return { users, isLoad, error, followItems }
}
