import { ReactComponent as Logo } from "img/logo.svg";
import s from "./Header.module.scss";

function Header() {
  return (
    <div className={s.Header}>
      <div className={s.Header__container}>
        {" "}
        <Logo className={s.Header__logo} />
      </div>
    </div>
  );
}

export default Header;
