import LoginForm from "components/Admin/LoginForm/LoginForm";
import { useState } from "react";
function AdminView() {
  const [currentUser, setCurrentUser] = useState(null);
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
