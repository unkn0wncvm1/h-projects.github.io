import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Shell from './Shell';

const App: React.FC<{}> = () => {
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const currentTheme = localStorage.getItem('theme');

	const [isDark, setDarkState] = useState<boolean>(currentTheme ? JSON.parse(currentTheme) : prefersDarkScheme);
	document.body.classList.add(isDark ? 'dark' : 'light');

	if (!currentTheme) {
		localStorage.setItem('theme', JSON.stringify(prefersDarkScheme));
	}

	function setDark() {
		localStorage.setItem('theme', JSON.stringify(!isDark));
		setDarkState((dark: boolean) => !dark);
		document.body.classList.toggle(isDark ? 'dark' : 'light');
	}

	function route(component: React.ReactNode, route: string) {
		return (
			<Route
				path={route}
				element={
					<Shell get={isDark} set={setDark}>
						{component}
					</Shell>
				}
			/>
		);
	}

	return (
		<Routes>
			{route(<Home />, '/')}
			{route(<About />, '/about')}
		</Routes>
	);
};

export default App;
