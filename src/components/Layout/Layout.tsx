import { Header } from "../Header/Header"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Container } from "../Container/Container"

export const Layout = () => {
	return (
		<>
			<Header />
			<main>
				<Suspense fallback={<p>Loading...</p>}>
					<Container>
						<Outlet />
					</Container>
				</Suspense>
			</main>
		</>
	)
}
