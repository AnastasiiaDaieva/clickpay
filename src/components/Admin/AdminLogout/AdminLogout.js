import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import s from "./AdminLogout.module.scss";
import axios from "axios";

function AdminLogout({ setCurrentUser }) {
  const handleClick = async () => {
    try {
      await axios.get("/users/logout");
      setCurrentUser("");
      localStorage.setItem("user", JSON.stringify(""));
    } catch (error) {
      console.log(error);
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
