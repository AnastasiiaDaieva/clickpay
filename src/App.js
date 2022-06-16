import Header from "components/Header/Header";
import s from "./App.module.scss";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "components/Loader/Loader";
import axios from "axios";
import { RequireAuth, GeneralAccess } from "helpers/checkAuth";
import { useState, useEffect } from "react";

// axios.defaults.baseURL = "https://clickpay-backend.herokuapp.com/api";
axios.defaults.baseURL = "http://localhost:5000/api";

const HomepageView = lazy(() =>
  import("views/HomepageView" /*webpackChunkName: "home-view" */)
);
const AdminView = lazy(() =>
  import("views/AdminView" /*webpackChunkName: "admin-view" */)
);

const LoginView = lazy(() =>
  import("views/LoginView" /*webpackChunkName: "login-view" */)
);

function App() {
  const [currentUser, setCurrentUser] = useState();
  //
  return (
    <div className={s.App}>
      <Header />

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomepageView />} />{" "}
            <Route
              path="/login"
              element={
                <GeneralAccess redirectTo="/admin">
                  <LoginView setCurrentUser={setCurrentUser} />
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
