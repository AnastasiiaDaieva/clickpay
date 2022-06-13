import { ReactComponent as Logo } from "img/logo.svg";
import s from "./Header.module.scss";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className={s.Header}>
      <div className={s.Header__container}>
        {" "}
        <NavLink to={"/"}>
          {" "}
          <Logo className={s.Header__logo} />
        </NavLink>{" "}
      </div>
    </div>
  );
}

export default Header;
