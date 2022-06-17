import LoginForm from "components/Admin/LoginForm/LoginForm";

function LoginView({ setCurrentUser, errorCode, setErrorCode }) {
  if (errorCode === 401) {
    setErrorCode(null);
  }
  return (
    <>
      <LoginForm setCurrentUser={setCurrentUser} />
    </>
  );
}

export default LoginView;
