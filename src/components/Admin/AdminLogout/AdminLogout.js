import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import s from "./AdminLogout.module.scss";
import axios from "axios";

function AdminLogout({ setToken }) {
  const handleClick = async () => {
    try {
      await axios.get("/users/logout");
      setToken("");
      // sessionStorage.removeItem("token");
      axios.defaults.headers.common.Authorization = "";
    } catch (error) {
      console.log("LOGOUT CATCH", error);
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
