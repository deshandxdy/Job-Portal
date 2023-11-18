import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
]);

export default router;
