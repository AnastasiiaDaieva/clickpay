import AdminTable from "components/Admin/AdminTable/AdminTable";
import { useState, useEffect } from "react";
import s from "./AdminView.module.scss";
import axios from "axios";
import Loader from "components/Loader/Loader";
import AdminLogout from "components/Admin/AdminLogout/AdminLogout";
import Filter from "components/Admin/Filter/Filter";
import Search from "components/Admin/Search/Search";
import ReactPaginate from "react-paginate";
import PaginatedTransactions from "components/Admin/AdminTable/PaginatedTransactions";

const currentToken = JSON.parse(localStorage.getItem("user")).token;

axios.defaults.headers.common.Authorization = `Bearer ${currentToken}`;
function AdminView({ setCurrentUser }) {
  // const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(" ");
  const [pageCount, setPageCount] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
    { value: "approved", label: "Approved" },
  ];
  const [filterOption, setFilterOption] = useState(filterOptions[0]);

  const handleFilter = async (option) => {
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
        const data = res.data.transactions;
        console.log("statusdata", data);

        setTransactions(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  const getVisibleTransactions = () => {
    const normalizedFilter = searchQuery.toLowerCase().trim();
    // console.log(normalizedFilter);

    return transactions.filter(
      (trn) =>
        trn.holderName.toLowerCase().includes(normalizedFilter) ||
        trn.account.toString().includes(searchQuery.trim())
    );
  };
  const visibleTransactions = getVisibleTransactions();
  // const setSearchQuery = (text) => {};
  // console.log("visible", visibleTransactions);

  useEffect(() => {
    setIsLoading(true);
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }

    const setFilter = localStorage.getItem("filter");
    if (setFilter) {
      const currentFilter = JSON.parse(setFilter);
      setFilterOption(currentFilter);
      // console.log("curfil", currentFilter.label);
    }

    setIsLoading(false);
  }, [setCurrentUser, setFilterOption]);

  const getTransactions = async (page) => {
    try {
      const response = await axios.get(
        `/transactions?page=${page}&limit=${itemsPerPage}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = async (event) => {
    setIsLoading(true);
    console.log(event.selected);
    console.log(currentPage);
    let currPage = event.selected + 1;
    console.log(currentPage);

    getTransactions(currPage)
      .then((res) => res.data.transactions)
      .then((newTrns) => {
        console.log(newTrns);
        const newArray = newTrns;
        setTransactions(newArray);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    // setCurrentPage(currPage);
  };

  useEffect(() => {
    setIsLoading(true);

    getTransactions()
      .then((res) => {
        // console.log(res);

        const data = res.data.transactions.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        // console.log("SORTED", data);
        setTransactions(data);
        setPageCount(Math.ceil(res.data.totalNumber / itemsPerPage));
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [itemsPerPage]);

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
      .then((trn) => {
        const res = transactions.findIndex((item) => item._id === id);
        console.log("obj", res);
        setTransactions((prevItems) => {
          const data = prevItems.filter((item) => item._id !== id);

          const firstPart = prevItems.splice(0, res, trn);
          console.log("SPLICE", firstPart);
          const secondPart = prevItems.slice();
          const sortedData = [firstPart, trn, secondPart];
          return data;
        });
      })
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    const getLocalStorage = JSON.parse(localStorage.getItem("filter"));
    // console.log("LS", getLocalStorage);

    getTransactions()
      .then((res) => {
        const data = res.data.transactions;
        // console.log(data);
        const filtered = data.filter((item) => {
          if (getLocalStorage.value === "pending") {
            return item.status === "pending";
          } else if (getLocalStorage.value === "rejected") {
            return item.status === "rejected";
          } else if (getLocalStorage.value === "approved") {
            return item.status === "approved";
          } else {
            return data;
          }
        });
        // console.log("SORTED and FILTERED", data);
        setTransactions(filtered);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  // console.log(currentUser);

  return (
    <>
      {" "}
      <div className={s.AdminView}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={s.AdminView__wrapper}>
              <Search setSearchQuery={setSearchQuery} />
              <Filter
                filterOptions={filterOptions}
                filterOption={filterOption}
                handleFilter={handleFilter}
              />{" "}
            </div>
            <AdminLogout setCurrentUser={setCurrentUser} />
            <AdminTable
              transactions={visibleTransactions}
              updStatus={updStatus}
            />
            <PaginatedTransactions
              itemsPerPage={itemsPerPage}
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </>
        )}
      </div>
    </>
  );
}

export default AdminView;
