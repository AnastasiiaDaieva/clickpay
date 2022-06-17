import { ReactComponent as Success } from "img/yes.svg";
import { ReactComponent as Fail } from "img/no.svg";
import { ReactComponent as Close } from "img/xsign.svg";
import s from "./Notification.module.scss";

function Notification({ isSuccessful, setIsInProgress }) {
  const handleClick = () => {
    window.clearInterval();
    setIsInProgress(true);
  };
  return (
    <div className={s.Notification}>
      {isSuccessful ? (
        <div className={s.Notification__success}>
          {" "}
          <Close className={s.Notification__close} onClick={handleClick} />
          <Success className={s.Notification__icon} />
          <h1 className={s.Notification__heading}>Well done!</h1>
          <p className={s.Notification__text}>Your payment has been sent.</p>
        </div>
      ) : (
        <div className={s.Notification__failure}>
          {" "}
          <Close className={s.Notification__close} onClick={handleClick} />{" "}
          <Fail className={s.Notification__icon} />{" "}
          <h1 className={s.Notification__heading}>Something went wrong</h1>
          <p className={s.Notification__text}>
            Your payment has not been sent.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        className={s.Notification__submit}
      >
        back to the main page
      </button>
    </div>
  );
}

export default Notification;
