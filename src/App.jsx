import "bootstrap/dist/css/bootstrap.css";
import {HashRouter, Route, Routes} from "react-router-dom";
import List from "./pages/List.jsx";
import {config} from "./lib/config.jsx";
import Details from "./pages/Details.jsx";

function App() {
    return (
		<HashRouter>
			{/*<AppNavbar />*/}
			<main>
				<Routes>
					<Route path={config.LIST.page} element={<List />} />
					<Route path={config.DETAILS.page} element={<Details />} />
					{/*<Route path="/recipes/add" element={<AddRecipe />} />*/}
				</Routes>
			</main>
		</HashRouter>
    );
}

export default App;
