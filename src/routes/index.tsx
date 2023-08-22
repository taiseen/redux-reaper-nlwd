import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../page/PageNotFound";
import App from "../App";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

export default routes;
