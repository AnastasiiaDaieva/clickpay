import Header from "components/Header/Header";
import s from "./App.module.scss";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "components/Loader/Loader";
import axios from "axios";

axios.defaults.baseURL = "https://clickpay-backend.herokuapp.com/api";
// axios.defaults.baseURL = "http://localhost:5000/api";

const HomepageView = lazy(() =>
  import("views/HomepageView" /*webpackChunkName: "home-view" */)
);
const AdminView = lazy(() =>
  import("views/AdminView" /*webpackChunkName: "admin-view" */)
);

function App() {
  //
  return (
    <div className={s.App}>
      <Header />

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomepageView />} />{" "}
            <Route path="/admin" element={<AdminView />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
