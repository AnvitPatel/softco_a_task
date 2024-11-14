import React, { Suspense } from "react";
import "../App.css";

const Login = React.lazy(() => import("../container/Login"));
const Register = React.lazy(() => import("../container/Register"));
const Projects = React.lazy(() => import("../container/Projects"));
const ProjectsAddEdit = React.lazy(
  () => import("../container/Projects/projectAddEdit")
);
const Estimates = React.lazy(() => import("../container/Estimates"));
const Dashboard = React.lazy(() => import("../container/Dashboard"));
const EstimatesAddEdit = React.lazy(
  () => import("../container/Estimates/estimatesAddEdit")
);

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SuspenseFallback from "../components/suspenseFallback/SuspenseFallback";
import { useSelector } from "react-redux";
import { RootState } from "../redux/storeConfig/store";
// import { Outlet } from "react-router-dom";
// import { handleLogout } from "../redux/slice/Slices/authSlice";
import Layout from "./layout";

const App = () => {
  const { login } = useSelector((state: RootState) => state?.auth);
  // const dispatch = useDispatch<AppDispatch>();
  const ProtectedRoute = ({
    component: Component,
  }: {
    component: JSX.Element;
  }) => {
    return login ? Component : <Navigate to="/login" />;
  };

  const mainRoutes = [
    {
      path: "/",
      element: <ProtectedRoute component={<Layout />} />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/projects/add",
          element: <ProjectsAddEdit />,
        },
        {
          path: "/projects/:id",
          element: <ProjectsAddEdit />,
        },
        {
          path: "/estimates",
          element: <Estimates />,
        },
        {
          path: "/estimates/add",
          element: <EstimatesAddEdit />,
        },
        {
          path: "/estimates/:id",
          element: <EstimatesAddEdit />,
        },
      ],
    },
  ];
  const authMainRoutes = [
    {
      path: "/login",
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          {login ? <Navigate to="/" /> : <Login />}
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          {login ? <Navigate to="/" /> : <Register />}
        </Suspense>
      ),
    },
  ];
  const router = createBrowserRouter([...authMainRoutes, ...mainRoutes]);
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
