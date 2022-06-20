import axios from "axios";

const getTransactions = async (page, itemsPerPage, token, setToken) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.get(
      `/transactions?page=${page}&limit=${itemsPerPage}`
    );
    return response;
  } catch (error) {
    if (error?.response.data.message.toLowerCase() === "not authorized") {
      console.log("401");
      setToken("");
      sessionStorage.setItem("token", JSON.stringify(""));
    } else {
      console.log("GET ORIGINAL CATCH", error.response.data.message);
    }
  }
};

export default getTransactions;
