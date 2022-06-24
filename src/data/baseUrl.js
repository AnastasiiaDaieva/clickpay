const protocol = () => {
  if (window.location.protocol === "http:") {
    return "http:";
  } else if (window.location.protocol === "https:") {
    return "https:";
  } else {
    console.log("value", window.location.protocol);
  }
};
export const heroku = `${protocol()}//clickpay-backend.herokuapp.com/api`;
export const localHost = `${protocol()}//localhost:5000/api`;
export const VPS = `${protocol()}//153.92.1.11:5000/api`;
