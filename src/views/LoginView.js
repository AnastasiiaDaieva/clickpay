import LoginForm from "components/Admin/LoginForm/LoginForm";

function LoginView({ setCurrentUser }) {
  return (
    <>
      <LoginForm setCurrentUser={setCurrentUser} />
    </>
  );
}

export default LoginView;
