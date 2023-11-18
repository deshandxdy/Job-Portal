import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <Outlet />
            <h1>Footer</h1>
        </>
    );
}

export default App;
