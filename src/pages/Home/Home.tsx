import sass from "./Home.module.scss";
import { FC } from "react";

const Home: FC = () => {
	return (
		<main className={sass.home}>
			<div className={sass.homeInner}>
				<p className={sass.description}>Cover text...</p>
				<h1 className={sass.title}>Bohdan Ryzhko</h1>
			</div>
		</main>
	)
}

export default Home;