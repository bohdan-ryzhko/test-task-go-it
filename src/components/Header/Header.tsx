import sass from "./Header.module.scss";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import filterValues from "../../configuration/filterValues.json";
import { Container } from "../Container/Container";
import links from "../../configuration/links.json";

export const Header: FC = () => {
	const { pathname } = useLocation();
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
							filterValues.map(button => <button key={button.id}>{button.status}</button>)
						}
					</div>
				</div>
			</Container>
		</header>
	)
}
