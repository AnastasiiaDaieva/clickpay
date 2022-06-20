import LoginForm from "components/Admin/LoginForm/LoginForm";
import { useEffect } from "react";

function LoginView({ setToken }) {
  // useEffect(() => {
  //   if (errorCode === 401) {
  //     setErrorCode(null);
  //   }
  // }, []);

  return (
    <>
      <LoginForm  setToken={setToken} />
    </>
  );
}

export default LoginView;
