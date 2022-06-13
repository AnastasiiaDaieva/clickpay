import LoginForm from "components/Admin/LoginForm/LoginForm";
import { useState, useEffect } from "react";
function AdminView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }
  }, []);

  console.log(currentUser);
  return (
    <>
      {currentUser ? (
        <p>successful login</p>
      ) : (
        <LoginForm setCurrentUser={setCurrentUser} />
      )}
    </>
  );
}

export default AdminView;
