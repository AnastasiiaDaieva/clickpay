import AdminTable from "components/Admin/AdminTable/AdminTable";
import LoginForm from "components/Admin/LoginForm/LoginForm";
import { useState, useEffect } from "react";
import s from "./AdminView.module.scss";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import AdminLogout from "components/Admin/AdminLogout/AdminLogout";

const getToken = JSON.parse(localStorage.getItem("user"));
axios.defaults.headers.common.Authorization = `Bearer ${getToken.token}`;

function AdminView() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getFunc = async () => {
      try {
        setIsLoading(true);
        // const response = await axios.get(
        //   "https://clickpay-backend.herokuapp.com/api/transactions"
        // );
        const response = await axios.get(
          "http://localhost:5000/api/transactions"
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    getFunc()
      .then((res) => {
        const data = res.data.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        console.log("SORTED", data);
        setTransactions(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }
  }, []);

  const updStatus = (status) => {
    console.log(status);
  };

  // console.log(currentUser);

  return (
    <div className={s.AdminView}>
      {isLoading ? (
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
      ) : (
        <>
          {currentUser ? (
            <>
              <AdminLogout setCurrentUser={setCurrentUser} />
              <AdminTable transactions={transactions} updStatus={updStatus} />
            </>
          ) : (
            <LoginForm setCurrentUser={setCurrentUser} />
          )}
        </>
      )}
    </div>
  );
}

export default AdminView;
