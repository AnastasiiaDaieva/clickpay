import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import s from "./AdminLogout.module.scss";
import axios from "axios";

function AdminLogout({ setCurrentUser, setErrorCode }) {
  const handleClick = async () => {
    try {
      await axios.get("/users/logout");
      setCurrentUser("");
      localStorage.setItem("user", JSON.stringify(""));
    } catch (error) {
      console.log("LOGOUT CATCH", error.response.data.message);
      if (error.response.data.message.toLowerCase() === "not authorized") {
        setCurrentUser("");
        localStorage.setItem("user", JSON.stringify(""));
        setErrorCode(401);
      }
    }
  };
  return (
    <Navbar className={s.AdminLogout}>
      <Container>
        <Button className={s.AdminLogout__button} onClick={handleClick}>
          Log out
        </Button>
      </Container>
    </Navbar>
  );
}
export default AdminLogout;
