import axios from "axios";

const getTransactions = async (page, itemsPerPage, token) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.get(
      `/transactions?page=${page}&limit=${itemsPerPage}`
    );
    // console.log("res", response);
    return response;
  } catch (error) {
    if (error?.response.data.message.toLowerCase() === "not authorized") {
      console.log("401");
      sessionStorage.setItem("token", JSON.stringify(""));
    } else {
      console.log("GET ORIGINAL CATCH", error.response.data.message);
    }
  }
};

export default getTransactions;
