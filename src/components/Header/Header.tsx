import sass from "./Header.module.scss";
import { FC, MouseEventHandler, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import filterValues from "../../configuration/filterValues.json";
import { Container } from "../Container/Container";
import links from "../../configuration/links.json";
import { AppDispatch } from "../../types/AppDispatch";
import { useDispatch } from "react-redux";
import { setFollowStatus } from "../../redux/usersSlice";
import { MdKeyboardArrowRight } from 'react-icons/md';

export const Header: FC = () => {
	const { pathname } = useLocation();
	const [status, setStatus] = useState<string | null>("");
	const [isDropDown, setIsDropDown] = useState<boolean>(false);

	const dispatch: AppDispatch = useDispatch();

	const onDefineFollows = (status: string | null) => {
		dispatch(setFollowStatus(status));
	}

	const onFilterButton: MouseEventHandler<HTMLButtonElement> = event => {
		const target = event.target as HTMLButtonElement;
		if (target) setStatus(target.textContent);
		onDefineFollows(target.textContent);
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
					<div>
						{
							pathname === "/tweets" &&
							<>
								<button className={sass.dropDownMenu} onClick={() => setIsDropDown(prev => !prev)}>
									Filter
									<MdKeyboardArrowRight className={isDropDown ? sass.arrowActive : sass.arrow} size={20} />
								</button>
								{
									isDropDown && 
									<>
										<ul className={sass.filterList}>
											{
												filterValues.map(button => (
													<li key={button.id}>
														<button
															disabled={status === button.status}
															className={sass.filterButton}
															onClick={onFilterButton}
														>
															{button.status}
														</button>
													</li>
												))
											}
										</ul>
									</>
								}
							</>
						}
					</div>
				</div>
			</Container>
		</header>
	)
}
