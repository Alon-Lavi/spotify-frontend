import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppHeader } from './cmps/AppHeader'
import { UserDetails } from './pages/UserDetails'
import { NavBar } from './cmps/NavBar'
import { NavLink } from 'react-router-dom'
import { StationDetails } from './pages/StationDetails'
import { StationIndex } from './pages/StationIndex'
import { Player } from './cmps/Player'
import { store } from './store/store'
import { SearchPage } from './cmps/SearchPage.jsx'
import { LoginSignup } from './pages/LoginSignup'

export function App() {
	return (
		<Provider store={store}>
			<Router>
				<section>
					<AppHeader />
					<main>
						<Routes>
							<Route element={<StationIndex />} path="/" />
							<Route element={<StationDetails />} path="/station/:stationId" />
							<Route element={<SearchPage />} path="/search" />
							<Route element={<StationIndex />} path="/search/station/:genre" />
							<Route element={<LoginSignup />} path="/loginsignup" />
							<Route element={<StationDetails />} path="/likedsongs" />
						</Routes>
					</main>
					<NavBar />
					<Player />
				</section>
			</Router>
		</Provider>
	)
}
