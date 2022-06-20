import LoginForm from "components/Admin/LoginForm/LoginForm";

function LoginView({ setToken }) {
  return (
    <>
      <LoginForm setToken={setToken} />
    </>
  );
}

export default LoginView;
