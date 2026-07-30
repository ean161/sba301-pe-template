import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./lib/config.jsx";
import List from "./pages/List.jsx";
import Details from "./pages/Details.jsx";
import Add from "./pages/Add.jsx";
import Delete from "./pages/Delete.jsx";
import Update from "./pages/Update.jsx";

function App() {
    return (
        <BrowserRouter>
            {/*<AppNavbar />*/}
            <main>
                <Routes>
                    <Route path={config.LIST.page} element={<List />} />
                    <Route path={config.DETAILS.page} element={<Details />} />
                    <Route path={config.ADD.page} element={<Add />} />
                    <Route path={config.UPDATE.page} element={<Update />} />
                    <Route path={config.DELETE.page} element={<Delete />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
