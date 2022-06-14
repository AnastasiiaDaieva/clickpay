import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import s from "./AdminLogout.module.scss";
import axios from "axios";

function AdminLogout({ setCurrentUser }) {
  const handleClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/logout"
      );
      setCurrentUser("");
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
