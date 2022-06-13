import AdminTable from "components/Admin/AdminTable/AdminTable";
import LoginForm from "components/Admin/LoginForm/LoginForm";
import { useState, useEffect } from "react";
import s from "./AdminView.module.scss";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function AdminView() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getFunc = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://clickpay-backend.herokuapp.com/api/transactions"
        );
        console.log(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    getFunc()
      .then((res) => setTransactions(res.data))
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

  console.log(currentUser);

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
            <AdminTable transactions={transactions} />
          ) : (
            <LoginForm setCurrentUser={setCurrentUser} />
          )}
        </>
      )}
    </div>
  );
}

export default AdminView;
