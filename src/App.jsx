import "bootstrap/dist/css/bootstrap.css";
import {HashRouter, Route, Routes} from "react-router-dom";
import List from "./pages/List.jsx";

function App() {
    return (
		<HashRouter>
			{/*<AppNavbar />*/}
			<main>
				<Routes>
					<Route path="/" element={<List />} />
					{/*<Route path="/recipes/add" element={<AddRecipe />} />*/}
					{/*<Route path="/recipes/:id" element={<RecipeDetails />} />*/}
				</Routes>
			</main>
		</HashRouter>
    );
}

export default App;
