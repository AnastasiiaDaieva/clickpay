import Header from "components/Header/Header";
import s from "./App.module.scss";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "components/Loader/Loader";
import { heroku, localHost, VPS } from "data/baseUrl";
import axios from "axios";

console.log(window.location.protocol);
axios.defaults.baseURL = VPS;

const HomepageView = lazy(() =>
  import("views/HomepageView" /*webpackChunkName: "home-view" */)
);
const AdminView = lazy(() =>
  import("views/AdminView" /*webpackChunkName: "admin-view" */)
);

function App() {
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
