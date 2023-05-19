import { Container } from "../Container/Container";
import sass from "./Header.module.scss";
import { FC } from "react";

export const Header: FC = () => {
	return (
		<header className={sass.header}>
			<Container>
				<div className={sass.headerInner}></div>
			</Container>
		</header>
	)
}
