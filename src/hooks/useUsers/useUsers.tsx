import { useSelector } from "react-redux"
import { selectError, selectIsLoad, selectUsers } from "../../redux/selectors"

export const useUsers = () => {
	const users = useSelector(selectUsers);
	const isLoad = useSelector(selectIsLoad);
	const error = useSelector(selectError);

	return { users, isLoad, error }
}
