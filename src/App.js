import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import ROUTES from "./Configs/Routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import AuthRoute from "./Components/AuthRoute";
import Dashboard from "./Pages/Dashboard";
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.SIGNUP}
              element={
                <AuthRoute>
                  <Signup />
                </AuthRoute>
              }
            />
            <Route path={ROUTES.LOGIN}
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />

            <Route element={<Layout />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <ToastContainer />
      </div>
    </Suspense>
  );
}

export default App;
