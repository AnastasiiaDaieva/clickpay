import AdminTable from "components/Admin/AdminTable/AdminTable";
import LoginForm from "components/Admin/LoginForm/LoginForm";
import { useState, useEffect } from "react";
import s from "./AdminView.module.scss";
import axios from "axios";
import Loader from "components/Loader/Loader";
import AdminLogout from "components/Admin/AdminLogout/AdminLogout";
import Filter from "components/Admin/Filter/Filter";
import Search from "components/Admin/Search/Search";

const currentToken = JSON.parse(localStorage.getItem("user")).token;

axios.defaults.headers.common.Authorization = `Bearer ${currentToken}`;
function AdminView({ setCurrentUser }) {
  // const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
    { value: "approved", label: "Approved" },
  ];
  const [filterOption, setFilterOption] = useState(filterOptions[0]);

  const handleFilter = (option) => {
    setFilterOption(option);
    localStorage.setItem("filter", option.value);
  };
  const getVisibleTransactions = () => {
    const normalizedFilter = searchQuery.toLowerCase().trim();

    return transactions.filter(
      (trn) =>
        trn.holderName.toLowerCase().includes(normalizedFilter) ||
        trn.account.toString().includes(searchQuery.trim())
    );
  };

  const visibleTransactions = getVisibleTransactions();
  // const setSearchQuery = (text) => {};

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }

    // const setFilter = localStorage.getItem("filter");
    // if (setFilter) {
    //   const currentFilter = JSON.parse(setFilter);
    //   setFilterOption( currentFilter );
    // }
  }, []);

  const getTransactions = async () => {
    try {
      const response = await axios.get("/transactions");
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

  const updStatus = (newStatus, id) => {
    setIsLoading(true);
    console.log(newStatus);

    axios
      .patch(`/transactions/${id}/status`, {
        status: newStatus,
      })
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

  useEffect(() => {
    setIsLoading(true);

    const getLocalStorage = localStorage.getItem("filter");
    console.log(getLocalStorage);

    getTransactions()
      .then((res) => {
        const data = res.data.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );

        const filtered = data.filter((item) => {
          if (getLocalStorage === "pending") {
            return item.status === "pending";
          } else if (getLocalStorage === "rejected") {
            return item.status === "rejected";
          } else if (getLocalStorage === "approved") {
            return item.status === "approved";
          } else {
            return data;
          }
        });
        console.log("SORTED and FILTERED", data);
        setTransactions(filtered);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  // console.log(currentUser);

  return (
    <div className={s.AdminView}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Search setSearchQuery={setSearchQuery} />
          <Filter
            filterOptions={filterOptions}
            filterOption={filterOption}
            handleFilter={handleFilter}
          />{" "}
          <AdminLogout setCurrentUser={setCurrentUser} />
          <AdminTable
            transactions={visibleTransactions}
            updStatus={updStatus}
          />
        </>
      )}
    </div>
  );
}

export default AdminView;
