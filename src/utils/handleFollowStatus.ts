import { Follow } from "../components/Button/Button";

export const handleFollowStatus = (prev: Follow) => {
	switch (prev) {
		case "Follow":
			return "Following";
		case "Following":
			return "Follow"
		default:
			return "Follow"
	}
}