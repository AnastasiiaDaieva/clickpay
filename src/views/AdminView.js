import AdminTable from "components/Admin/AdminTable/AdminTable";
import { useState, useEffect } from "react";
import s from "./AdminView.module.scss";
import axios from "axios";
import Loader from "components/Loader/Loader";
import AdminLogout from "components/Admin/AdminLogout/AdminLogout";
import Filter from "components/Admin/Filter/Filter";
import Search from "components/Admin/Search/Search";
import { Navigate } from "react-router";
import PaginatedTransactions from "components/Admin/AdminTable/PaginatedTransactions";

const currentToken = JSON.parse(localStorage.getItem("user")).token;

axios.defaults.headers.common.Authorization = `Bearer ${currentToken}`;

function AdminView({ setCurrentUser, errorCode, setErrorCode }) {
  // const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageCount, setPageCount] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const getTransactions = async (page) => {
    try {
      const response = await axios.get(
        `/transactions?page=${page}&limit=${itemsPerPage}`
      );
      return response;
    } catch (error) {
      // console.log(error.message);
      if (error.response.data.message.toLowerCase() === "not authorized") {
        setCurrentUser("");
        localStorage.setItem("user", JSON.stringify(""));
        setErrorCode(401);
      } else {
        console.log("GET ORIGINAL CATCH", error.response.data.message);
      }
    }
  };

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
        setPageCount(Math.ceil(res.data.totalNumber / itemsPerPage));
        const data = res.data.transactions;
        console.log("statusdata", res);

        setTransactions(data);
      })
      .catch((error) => {
        if (error.response.data.message.toLowerCase() === "not authorized") {
          setCurrentUser("");
          localStorage.setItem("user", JSON.stringify(""));
          setErrorCode(401);
        } else {
          console.log("FILTER CATCH", error.response.data.message);
        }
      })
      .finally(() => setIsLoading(false));
  };
  const getVisibleTransactions = () => {
    const normalizedFilter = searchQuery.toLowerCase().trim();
    // console.log(normalizedFilter);
    if (transactions) {
      console.log(transactions);
      return transactions.filter(
        (trn) =>
          trn.holderName.toLowerCase().includes(normalizedFilter) ||
          trn.account.toString().includes(searchQuery.trim())
      );
    }
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

    const setQuery = localStorage.getItem("query");
    if (setQuery) {
      setSearchQuery(setQuery);
      // console.log("curfil", currentFilter.label);
    }

    setIsLoading(false);
  }, [setCurrentUser, setFilterOption]);

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
        setCurrentPage(currPage);
      })
      .catch((error) => {
        console.log("PAGE CLICK CATCH", error.response.data.message);
      })
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
      .catch((error) =>
        console.log("GET UE CATCH", error.response.data.message)
      )
      .finally(() => setIsLoading(false));
  }, []);

  const updStatus = (newStatus, id) => {
    setIsLoading(true);
    // console.log(newStatus);

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
        console.log(trn);
        const idx = transactions.findIndex((item) => item._id === id);
        console.log("obj", idx);
        let items = [...transactions];
        let item = { ...transactions[idx] };
        // 2. Make a shallow copy of the item you want to mutate
        // 3. Replace the property you're intested in
        item.status = trn.status;
        item.updatedAt = trn.updatedAt;

        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[idx] = item;
        // 5. Set the state to our new copy
        setTransactions(items);

        // const sortedData = transactions.splice(res, res, trn);
        // console.log("SPLICE", sortedData);
        // setTransactions(sortedData);
        // return data;
      })
      .catch((error) =>
        console.log("UPDSTATUS CATCH", error.response.data.message)
      )
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    const getLocalStorage = JSON.parse(localStorage.getItem("filter"));
    // console.log("LS", getLocalStorage);

    getTransactions()
      .then((res) => {
        const data = res.data.transactions;
        console.log(data);
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
      .catch((error) =>
        console.log("REFRESH CATCH", error.response.data.message)
      )
      .finally(() => setIsLoading(false));
  }, []);

  // console.log(currentUser);

  return (
    <>
      {errorCode === 401 && <Navigate to="/login" />}
      {visibleTransactions && (
        <div className={s.AdminView}>
          {isLoading || transactions === undefined ? (
            <Loader />
          ) : (
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
              <AdminLogout setCurrentUser={setCurrentUser} />
              <AdminTable
                transactions={visibleTransactions}
                updStatus={updStatus}
              />
              {/* <PaginatedTransactions
                itemsPerPage={itemsPerPage}
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              /> */}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AdminView;
