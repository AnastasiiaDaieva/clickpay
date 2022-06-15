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

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "https://clickpay-backend.herokuapp.com/api/transactions"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getTransactions()
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

  const updStatus = (newStatus, id) => {
    setIsLoading(true);
    console.log(newStatus);

    axios
      .patch(
        `https://clickpay-backend.herokuapp.com/api/transactions/${id}/status`,
        {
          status: newStatus,
        }
      )
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        return data;
      })
      .then((item) =>
        setTransactions((prevItems) => {
          const data = prevItems.filter((item) => item._id !== id);
          const sortedData = data.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          );
          return [item, ...sortedData];
        })
      )
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
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
