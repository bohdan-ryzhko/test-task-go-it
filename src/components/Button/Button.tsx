import sass from "./Button.module.scss";
import { FC } from "react";

export type Follow = "Follow" | "Following";

interface ButtonProps {
	status: Follow;
	onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ status, onClick }) => (
	<button
		onClick={onClick}
		className={status === "Follow" ? sass.Follow : sass.Following}
	>{status}
	</button>
)
