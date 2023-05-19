import sass from "./Header.module.scss";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import filterValues from "../../configuration/filterValues.json";
import { Container } from "../Container/Container";
import links from "../../configuration/links.json";
import { AppDispatch } from "../../types/AppDispatch";
import { useDispatch } from "react-redux";
import { setFollowStatus } from "../../redux/usersSlice";
// import { useUsers } from "../../hooks/useUsers/useUsers";

export const Header: FC = () => {
	const { pathname } = useLocation();
	const dispatch: AppDispatch = useDispatch();

	// const { followStatus } = useUsers();

	const onDefineFollows = (status: string) => {
		dispatch(setFollowStatus(status))
	}

	return (
		<header className={sass.header}>
			<Container>
				<div className={sass.headerInner}>
					<nav className={sass.navigation}>
						<ul className={sass.navList}>
							{
								links.map(link =>
									<li key={link.id}>
										<NavLink
											className={pathname === link.to ? sass.activeNavLink : sass.navLink}
											to={link.to}>
											{link.value}
										</NavLink>
									</li>
								)
							}
						</ul>
					</nav>
					<div className={sass.filterButtons}>
						{
							pathname === "/tweets" &&
							filterValues.map(
								button =>
									<button
										onClick={() => onDefineFollows(button.followStatus)}
										key={button.id}>
										{button.status}
									</button>
							)
						}
					</div>
				</div>
			</Container>
		</header>
	)
}
