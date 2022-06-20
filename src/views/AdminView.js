import AdminTable from "components/Admin/AdminTable/AdminTable";
import { useState, useEffect, lazy } from "react";
import s from "./AdminView.module.scss";
import axios from "axios";
import Loader from "components/Loader/Loader";
import AdminLogout from "components/Admin/AdminLogout/AdminLogout";
import Filter from "components/Admin/Filter/Filter";
import Search from "components/Admin/Search/Search";
import PaginatedTransactions from "components/Admin/AdminTable/PaginatedTransactions";
import useToken from "hooks/useToken";
import LoginForm from "components/Admin/LoginForm/LoginForm";
import getTransactions from "api/getTransactions";
import filterOptions from "data/filterOptions.json";
import transactionStatus from "data/constants/transactionStatus";

function AdminView() {
  const { pending, rejected, approved } = transactionStatus;

  const { token, setToken } = useToken();

  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [filterOption, setFilterOption] = useState(filterOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  //  handlers
  const handleFilter = async (option) => {
    if (token) {
      setIsLoading(true);
      localStorage.setItem("filter", JSON.stringify(option));
      setFilterOption(option);
      await axios
        .get(
          option.value === "all"
            ? `/transactions?page=${currentPage}&limit=${itemsPerPage}`
            : `/transactions/status/${option.value}?page=${currentPage}&limit=${itemsPerPage}`
        )
        .then((res) => {
          setPageCount(Math.ceil(res.data.totalNumber / itemsPerPage));
          const data = res.data.transactions;

          setTransactions(data);
        })
        .catch((error) => {
          console.log("FILTER CATCH", error.response.data.message);
          if (error.response.data.message.toLowerCase() === "not authorized") {
            console.log(401);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handlePageClick = async (event) => {
    setIsLoading(true);

    let currPage = event.selected + 1;

    getTransactions(currPage, itemsPerPage, token, setToken)
      .then((res) => res.data.transactions)
      .then((newTrns) => {
        // console.log(newTrns);
        const newArray = newTrns;
        setTransactions(newArray);
        setCurrentPage(currPage);
      })
      .finally(() => setIsLoading(false));
  };

  const updStatus = (newStatus, id) => {
    if (token) {
      setIsLoading(true);
      // console.log(newStatus);

      axios
        .patch(`/transactions/${id}/status`, {
          status: newStatus,
        })

        .then((trn) => {
          // console.log(trn);
          const idx = transactions.findIndex((item) => item._id === id);
          // console.log("obj", idx);
          let items = [...transactions];
          let item = { ...transactions[idx] };

          item.status = trn.data.status;
          item.updatedAt = trn.data.updatedAt;

          items[idx] = item;
          setTransactions(items);
        })
        .catch((error) => {
          console.log("UPDSTATUS CATCH", error);
          if (error.response.data.message.toLowerCase() === "not authorized") {
            setToken("");
            console.log(401);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  const getVisibleTransactions = () => {
    const normalizedFilter = searchQuery.toLowerCase().trim();
    // console.log(normalizedFilter);
    if (transactions) {
      // console.log(transactions);
      return transactions.filter(
        (trn) =>
          trn.holderName.toLowerCase().includes(normalizedFilter) ||
          trn.account.toString().includes(searchQuery.trim())
      );
    }
  };
  const visibleTransactions = getVisibleTransactions();
  // console.log("visible", visibleTransactions);

  // useEffects
  useEffect(() => {
    setIsLoading(true);

    const setFilter = localStorage.getItem("filter");
    if (setFilter) {
      const currentFilter = JSON.parse(setFilter);
      setFilterOption(currentFilter);
    } else {
      localStorage.setItem("filter", JSON.stringify(filterOptions[0]));
    }

    const setQuery = localStorage.getItem("query");
    if (setQuery) {
      setSearchQuery(setQuery);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      const getLocalStorage = JSON.parse(localStorage.getItem("filter"));

      getTransactions(currentPage, itemsPerPage, token, setToken)
        .then((res) => {
          // console.log(res);

          const data = res.data.transactions.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          );
          // console.log("SORTED", data);

          const filtered = data.filter((item) => {
            if (getLocalStorage.value === pending) {
              return item.status === pending;
            } else if (getLocalStorage.value === rejected) {
              return item.status === rejected;
            } else if (getLocalStorage.value === approved) {
              return item.status === approved;
            } else {
              return data;
            }
          });
          setTransactions(filtered);
          setPageCount(Math.ceil(res.data.totalNumber / itemsPerPage));
        })
        .finally(() => setIsLoading(false));
    } else {
      sessionStorage.setItem("token", JSON.stringify(""));

      axios.defaults.headers.common.Authorization = "";
    }
  }, [token]);

  return (
    <>
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <div className={s.AdminView}>
          {isLoading && <Loader />}

          <div>
            <div className={s.AdminView__wrapper}>
              <Search
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
              <Filter
                filterOptions={filterOptions}
                filterOption={filterOption}
                handleFilter={handleFilter}
              />{" "}
            </div>
            <AdminLogout
              setToken={setToken}
              setTransactions={setTransactions}
            />
            <AdminTable
              transactions={visibleTransactions}
              updStatus={updStatus}
            />
            <PaginatedTransactions
              itemsPerPage={itemsPerPage}
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminView;
