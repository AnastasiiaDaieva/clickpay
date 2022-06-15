import Header from "components/Header/Header";
import s from "./App.module.scss";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { RequireAuth, GeneralAccess } from "helpers/checkAuth";
import { useState, useEffect } from "react";

axios.defaults.baseURL = "https://clickpay-backend.herokuapp.com/api";
// axios.defaults.baseURL = "http://localhost:5000/api";

const HomepageView = lazy(() =>
  import("views/HomepageView" /*webpackChunkName: "home-view" */)
);
const AdminView = lazy(() =>
  import("views/AdminView" /*webpackChunkName: "admin-view" */)
);

const LoginForm = lazy(() =>
  import(
    "components/Admin/LoginForm/LoginForm" /*webpackChunkName: "login-form" */
  )
);

function App() {
  const [currentUser, setCurrentUser] = useState();

  return (
    <div className={s.App}>
      <Header />

      <main>
        <Suspense
          fallback={
            <Spinner
              animation="grow"
              variant="dark"
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          }
        >
          <Routes>
            <Route path="/" element={<HomepageView />} />{" "}
            <Route
              path="/login"
              element={
                <GeneralAccess redirectTo="/admin">
                  <LoginForm setCurrentUser={setCurrentUser} />
                </GeneralAccess>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAuth redirectTo="/login">
                  <AdminView setCurrentUser={setCurrentUser} />
                </RequireAuth>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
