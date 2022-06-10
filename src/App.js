import Header from "components/Header/Header";
import s from "./App.module.scss";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";

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
        {" "}
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
            <Route path="/" element={<HomepageView />} />
            <Route path="/admin" element={<AdminView />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
